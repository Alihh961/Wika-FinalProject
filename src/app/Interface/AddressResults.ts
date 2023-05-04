export interface Feature {
    type: string;
    geometry: {
        type: string;
        coordinates: [number, number];
    };
    properties: {
        label: string;
        score: number;
        housenumber: string;
        id: string;
        type: string;
        name: string;
        postcode: string;
        citycode: string;
        x: number;
        y: number;
        city: string;
        context: string;
        importance: number;
        street: string;
    };
}

export interface FeatureCollection {
    type: string;
    version: string;
    features: Feature[];
    attribution: string;
    licence: string;
    query: string;
    limit: number;
}