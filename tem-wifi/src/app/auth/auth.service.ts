import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string;

  constructor(private storageService: StorageService) {
    
    this.storageService.get('token')
      .subscribe(
        token => this.token = token
      )
  }

  public isAuthenticated(): Promise<boolean> {

    let jwtHelper: JwtHelperService = new JwtHelperService();

    return new Promise((resolve, reject) => {
      this.storageService.get('token')
        .subscribe(
          token => {
            this.token = token;
            resolve(!jwtHelper.isTokenExpired(this.token));
          },
          error => reject(error)
        )
    })   
    
  }

  public clearToken() {
    this.token = '';
  }
}