import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetLocationRequest } from '../shared/models/locais/get-location-request.model';
import { Observable } from 'rxjs';
import { GetLocationResponse } from '../shared/models/locais/get-location-response.model';
import { httpOptions, awsBaseUrl } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class LocaisService {

  constructor(private http: HttpClient) { }

  getLocation(request: string): Observable<GetLocationResponse> {

    return this.http.get<GetLocationResponse>(`${awsBaseUrl}/location/${request}`, httpOptions);
  }
}
