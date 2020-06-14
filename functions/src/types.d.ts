export interface Location {
    latitude: number;
    longitude: number;
}
export interface ObjectItemInput {
    title: string;
    description: string;
    short_description: string | null;
    type: 'chat' | 'request' | 'offer' | 'donation' | 'place';
    valid_until: string | null;
    loc: Location;
    logoURL: string | null;
    url: string | null;
    external_data: any;
}
export interface ObjectItem extends ObjectItemInput {
    author: string;
    origin: string;
    id: string;
    created: string;
    updated: string;
}
