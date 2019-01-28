export interface PutRatingRequest {

    id: string,
    internet: PutInternetRatingRequest;
    foods: string;
    drinks: string;
    treatment: number;
    price: number;
    comfort: number;
    noise: number;
    generalRating: number;
}

export interface PutInternetRatingRequest {

    hasInternet: boolean;
    speed: number;
    isOpened: boolean;
    pass?: string;
}