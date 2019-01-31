import { DefaultResponse } from "../response/default-response.model";

export interface GetLocationResponse extends DefaultResponse {

    id: string;
    type: string;
    name: string;
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