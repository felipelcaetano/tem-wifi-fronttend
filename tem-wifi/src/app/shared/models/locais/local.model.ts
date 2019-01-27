export interface Local {

    id: string;
    street: string;
    number: string;
    complement?: string;
    postCode: string;
    city: string;
    state: string;
    country: string | "Brasil";
}