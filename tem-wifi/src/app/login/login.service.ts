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
import { AuthService as SocialAuthService, SocialUser } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private storageService: StorageService, private authService: AuthService,
    private socialAuthService: SocialAuthService) {
  }

  public login$: Observable<string> = new Observable((observer) => {
    this.emit = value => observer.next(value);
  });

  login(request: PostLoginRequest): Observable<PostLoginResponse> {

    return this.http.post<PostLoginResponse>(`${awsBaseUrl}/auth/login`, request, httpOptions);      
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

  logout(): void {
    this.emit('');
    this.storageService.clear();
    this.authService.clearToken();
    this.signOut();
  }

  emit(email: string) {
  }

  registerNewUser(request: PostNewUserRequest): Observable<PostNewUserResponse> {

    return this.http.post<PostLoginResponse>(`${awsBaseUrl}/auth/user`, request, httpOptions);
  }
}
