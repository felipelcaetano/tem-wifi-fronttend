import { Local } from "../locais/local.model";

export interface Avaliacao {

    id: string;
    local: Local;
    userId: string;
    internet: AvaliacaoInternet;
    foods: string;
    drinks: string;
    treatment: number;
    price: number;
    comfort: number;
    noise: number;
    generalRating: number;
}

export interface AvaliacaoInternet {

    hasInternet: boolean;
    speed: number;
    isOpened: boolean;
    pass?: string;
}