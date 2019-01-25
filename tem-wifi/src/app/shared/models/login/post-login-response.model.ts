import { DefaultResponse } from "../response/default-response.model";

export interface PostLoginResponse extends DefaultResponse {

    id: string,
    email: string,
    token: string
}