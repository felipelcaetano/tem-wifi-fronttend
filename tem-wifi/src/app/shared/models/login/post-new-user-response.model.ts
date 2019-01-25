import { DefaultResponse } from "../response/default-response.model";

export interface PostNewUserResponse extends DefaultResponse {

    id: string,
    email: string,
    token: string
}