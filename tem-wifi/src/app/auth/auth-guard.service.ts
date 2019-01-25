import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log('Login check');

    return new Promise((resolve, reject) => {
      this.auth.isAuthenticated()
        .then(isAuth => {
          if (!isAuth) {
            // redirect the user
            this.router.navigate(['/login']);
            resolve(false);
          }
      
          resolve(true);
        })        
    })
  }
}