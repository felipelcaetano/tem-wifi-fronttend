import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetRatingsRequest } from '../shared/models/avaliacoes/get-ratings-request.model';
import { GetRatingsResponse } from '../shared/models/avaliacoes/get-ratings-response.model';
import { Observable } from 'rxjs';
import { httpOptions, awsBaseUrl } from '../shared/constants/constants';

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
    options.params.append("locatonId", request.locationId);
    options.params.append("userId", request.userId);
    
    return this.http.get<GetRatingsResponse>(`${awsBaseUrl}/rating`, options);
  }
}
