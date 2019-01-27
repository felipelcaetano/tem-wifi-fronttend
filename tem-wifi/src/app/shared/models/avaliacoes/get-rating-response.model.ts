import { DefaultResponse } from "../response/default-response.model";

export interface GetRatingResponse extends DefaultResponse {

    id: string;
    locationId: string;
    userId: string;
    internet: GetRatingInternetResponse;
    foods: string;
    drinks: string;
    treatment: number;
    price: number;
    comfort: number;
    noise: number;
    generalRating: number;
}

export interface GetRatingInternetResponse {

    hasInternet: boolean;
    speed: number;
    isOpened: boolean;
    pass?: string;
}