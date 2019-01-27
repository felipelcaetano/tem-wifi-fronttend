import { GetRatingResponse } from "./get-rating-response.model";
import { DefaultResponse } from "../response/default-response.model";

export interface GetRatingsResponse extends DefaultResponse {

    ratings: GetRatingResponse[];
}