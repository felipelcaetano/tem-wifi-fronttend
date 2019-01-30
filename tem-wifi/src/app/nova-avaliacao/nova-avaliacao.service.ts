import { Injectable } from '@angular/core';
import { PostLocationRequest } from '../shared/models/locais/post-location-request.model';
import { awsBaseUrl, httpOptions } from '../shared/constants/constants';
import { Local } from '../shared/models/locais/local.model';
import { Observable } from 'rxjs';
import { PostLocationResponse } from '../shared/models/locais/post-location-response.model';
import { HttpClient } from '@angular/common/http';
import { Avaliacao } from '../shared/models/avaliacoes/avaliacao.model';
import { PostRatingResponse } from '../shared/models/avaliacoes/post-rating-response.model';
import { PostRatingRequest } from '../shared/models/avaliacoes/post-rating.request.model';

@Injectable({
  providedIn: 'root'
})
export class NovaAvaliacaoService {

  constructor(private http: HttpClient) { }

  createLocation(local: Local): Observable<PostLocationResponse> {

    let locationRequest: PostLocationRequest = {
      name: local.name,
      city: local.city,
      complement: local.complement,
      country: local.country,
      number: local.number,
      postCode: local.postCode,
      state: local.state,
      street: local.street
    }

    return this.http.post<PostLocationResponse>(`${awsBaseUrl}/location`, locationRequest, httpOptions);
  }

  createRating(avaliacao: Avaliacao): Observable<PostRatingResponse> {

    let ratingRequest: PostRatingRequest = {
      comfort: avaliacao.comfort,
      internet: {
        hasInternet: avaliacao.internet.hasInternet,
        isOpened: avaliacao.internet.isOpened,
        pass: avaliacao.internet.pass,
        speed: avaliacao.internet.speed
      },
      drinks: avaliacao.drinks,
      foods: avaliacao.foods,
      generalRating: avaliacao.generalRating,
      locationId: avaliacao.location.id,
      noise: avaliacao.noise,
      price: avaliacao.price,
      treatment: avaliacao.treatment,
      userId: avaliacao.userId
    }

    return this.http.post<PostLocationResponse>(`${awsBaseUrl}/rating`, ratingRequest, httpOptions);
  }
}
