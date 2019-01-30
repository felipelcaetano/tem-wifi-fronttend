export interface PostRatingRequest {

    locationId: string,
    userId: string,
    internet: PostInternetRatingRequest;
    foods: string;
    drinks: string;
    treatment: number;
    price: number;
    comfort: number;
    noise: number;
    generalRating: number;
}

export interface PostInternetRatingRequest {

    hasInternet: boolean;
    speed: number;
    isOpened: boolean;
    pass?: string;
}