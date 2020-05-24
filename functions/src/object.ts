import * as firebase from 'firebase-admin';
import { ObjectItem, ObjectItemInput } from './types';

const assertLocation = (loc: any) => {
    if (!loc?.latitude || !loc?.longitude) throw new Error('Wrong loc format');
};
const assertAllDefined = (obj: any) => {
    for (const key in obj) {
        if (obj[key] === undefined)
            throw new Error('One of mandatory parameters is missing');
    }
};

const dropUndefined = (obj: any) => {
    const newObj = { ...obj };
    for (const key in newObj) {
        if (newObj[key] === undefined) delete newObj[key];
    }
    return newObj;
};

const geoPoint2Location = (pt: firebase.firestore.GeoPoint) => ({
    latitude: pt.latitude,
    longitude: pt.longitude,
});

const dbObj2Api = (doc: firebase.firestore.DocumentSnapshot) => {
    const data: any = {
        id: doc.id,
        ...doc.data(),
    };
    if (data.loc) {
        data.loc = geoPoint2Location(doc.data()!.loc);
    }
    return data;
};

export const getObject = async (origin: string, id: string) => {
    console.log('get object', { origin, id });
    const doc = await firebase.firestore().collection('objects').doc(id).get();
    if (!doc.exists) return null;
    return dbObj2Api(doc);
};

export const postObject = async (
    origin: string,
    data: Partial<ObjectItemInput>
) => {
    console.log('post object:', { origin, data });
    const {
        title,
        short_description = null,
        description,
        type,
        valid_until,
        loc,
        logoURL = null,
        url = null,
    } = data;
    assertLocation(loc);
    const timenow = new Date().toISOString();
    const itemData: Partial<ObjectItem> = {
        title: title || description,
        description: description || title,
        short_description,
        logoURL,
        url,
        loc: new firebase.firestore.GeoPoint(loc!.latitude, loc!.longitude),
        valid_until: valid_until || null,
        type,
        origin,
        author: origin,
        created: timenow,
        updated: timenow,
    };
    assertAllDefined(itemData);
    const ref = await firebase.firestore().collection('objects').add(itemData);
    const doc = await ref.get();
    console.log('Post Result:', doc.id, doc.data());
    return dbObj2Api(doc);
};

export const updateObject = async (
    origin: string,
    id: string,
    data: Partial<ObjectItemInput>
) => {
    console.log('update object:', { origin, id, data });
    if (!id || !origin)
        throw new Error('One of mandatory arguments is missing');

    const {
        title,
        short_description,
        description,
        type,
        valid_until,
        loc,
        logoURL,
        url,
    } = data;
    const timenow = new Date().toISOString();
    const itemData: Partial<ObjectItem> = dropUndefined({
        title: title ?? description,
        description: description ?? title,
        short_description,
        logoURL,
        url,
        loc: loc
            ? new firebase.firestore.GeoPoint(loc.latitude, loc.longitude)
            : undefined,
        valid_until: valid_until || null,
        type,
        updated: timenow,
    });
    const ref = firebase.firestore().collection('objects').doc(id);

    return firebase
        .firestore()
        .runTransaction(async (transaction) => {
            const doc = await transaction.get(ref);
            if (!doc.data()) throw new Error('Object not found');
            if (doc.data()?.origin !== origin)
                throw new Error('Permission denied');

            transaction.update(ref, {
                ...itemData,
            });
        })
        .then(() => ref.get())
        .then((doc) => {
            return dbObj2Api(doc);
        });
};

export const deleteObject = async (origin: string, id: string) => {
    console.log('delete object:', { origin, id });
    if (!id || !origin)
        throw new Error('One of mandatory arguments is missing');

    const ref = firebase.firestore().collection('objects').doc(id);

    return firebase.firestore().runTransaction(async (transaction) => {
        const doc = await transaction.get(ref);
        if (!doc.data()) throw new Error('Object not found');
        if (doc.data()?.origin !== origin) throw new Error('Permission denied');

        transaction.delete(ref);
    });
};
