import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import * as express from 'express';
import { postObject, getObject, updateObject, deleteObject } from './object';
firebase.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase! ' + request.query.gaga);
});

const validateToken = async (token: string) => {
    const snap = await firebase
        .firestore()
        .collection('api-keys')
        .where('token', '==', token)
        .get();
    const keys = snap.docs.map((doc) => doc.data());

    if (keys.length !== 1 || keys[0].revoked)
        throw new Error('Access key invalid or revoked!');
    return keys[0];
};

const authMiddleware = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    validateToken((req.query.token as string) || '')
        .then((key) => {
            (req as any).auth = key;
            next();
        })
        .catch((err) => {
            return res.status(403).send(err.message);
        });
};

const promise2resp = (res: express.Response) => (cb: () => Promise<any>) =>
    cb()
        .then((data) => {
            if (data) res.json(data);
            else res.sendStatus(200);
        })
        .catch((err) => res.status(500).send(err.message));

const app = express();

// Automatically allow cross-origin requests
// app.use(cors({ origin: true }));

// Add middleware to authenticate requests
app.use(authMiddleware);

// build multiple CRUD interfaces:
app.get('/:id', (req, res) =>
    getObject((req as any).auth.origin, req.params.id)
        .then((data) => {
            if (data) {
                res.json(data);
            } else {
                res.status(404).send('Object not found.');
            }
        })
        .catch((err) => res.status(500).send(err.message))
);
app.post('/', async (req, res) =>
    promise2resp(res)(() => postObject((req as any).auth.origin, req.body))
);
app.put('/:id', async (req, res) =>
    promise2resp(res)(() =>
        updateObject((req as any).auth.origin, req.params.id, req.body)
    )
);
app.delete('/:id', async (req, res) =>
    promise2resp(res)(() =>
        deleteObject((req as any).auth.origin, req.params.id)
    )
);
// TODO
// app.get('/', (req, res) => res.send(findObjects));

// Expose Express API as a single Cloud Function:
exports.object = functions.https.onRequest(app);
