import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetRatingsRequest } from '../shared/models/avaliacoes/get-ratings-request.model';
import { GetRatingsResponse } from '../shared/models/avaliacoes/get-ratings-response.model';
import { Observable } from 'rxjs';
import { httpOptions, awsBaseUrl } from '../shared/constants/constants';
import { Avaliacao } from '../shared/models/avaliacoes/avaliacao.model';
import { PutInternetRatingRequest, PutRatingRequest } from '../shared/models/avaliacoes/put-rating.request.model';

@Injectable({
  providedIn: 'root'
})
export class MinhasAvaliacoesService {

  constructor(private http: HttpClient) { }

  listRatings(request: GetRatingsRequest): Observable<GetRatingsResponse> {

    let options = {
      headers: httpOptions.headers, 
      params: new HttpParams()
    }

    options.params = options.params.set('locatonId', request.locationId);
    options.params = options.params.set('userId', request.userId);

    return this.http.get<GetRatingsResponse>(`${awsBaseUrl}/rating`, options);
  }

  updateRating(request: Avaliacao): Observable<any> {

    let internetRequest: PutInternetRatingRequest = {
      hasInternet: request.internet.hasInternet,
      isOpened: request.internet.isOpened,
      pass: request.internet.isOpened ? '' : request.internet.pass,
      speed: request.internet.speed
    }

    let ratingRequest: PutRatingRequest = {
      comfort: request.comfort,
      drinks: request.drinks,
      foods: request.foods,
      generalRating: request.generalRating,
      id: request.id,
      internet: internetRequest,
      noise: request.noise,
      price: request.price,
      treatment: request.treatment
    }

    return this.http.put<PutRatingRequest>(`${awsBaseUrl}/rating/${request.id}`, ratingRequest, httpOptions);
  }
}
