export interface GetLocationResponse {

    id: string;
    street: string;
    number: string;
    complement?: string;
    postCode: string;
    city: string;
    state: string;
    country: string;
    ratingsCount: number;
    ratings: string[];
}