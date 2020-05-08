export interface Location {
    latitude: number;
    longitude: number;
}
export interface ObjectItemInput {
    title: string;
    description: string;
    type: 'chat' | 'request' | 'offer' | 'donation' | 'place';
    valid_until: string | null;
    loc: Location;
}
export interface ObjectItem extends ObjectItemInput {
    author: string;
    origin: string;
    id: string;
    created: string;
    updated: string;
}
