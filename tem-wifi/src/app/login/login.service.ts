import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostLoginRequest } from '../shared/models/login/post-login-request.model';
import { awsBaseUrl, httpOptions } from '../shared/constants/constants';
import { Observable } from 'rxjs';
import { PostLoginResponse } from '../shared/models/login/post-login-response.model';
import { StorageService } from '../storage/storage.service';
import { AuthService } from '../auth/auth.service';
import { PostNewUserRequest } from '../shared/models/login/post-new-user-request.model';
import { PostNewUserResponse } from '../shared/models/login/post-new-user-response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private storageService: StorageService, private authService: AuthService) { }

  public login$: Observable<string> = new Observable((observer) => {
    this.emit = nome => observer.next(nome);
  });

  login(request: PostLoginRequest): Observable<PostLoginResponse> {

    return this.http.post<PostLoginResponse>(`${awsBaseUrl}/auth/login`, request, httpOptions);
  }

  logout(): void {
    this.emit('');
    this.storageService.clear();
    this.authService.clearToken();
  }

  emit(email: string) {
  }

  registerNewUser(request: PostNewUserRequest): Observable<PostNewUserResponse> {

    return this.http.post<PostLoginResponse>(`${awsBaseUrl}/auth/user`, request, httpOptions);
  }
}
