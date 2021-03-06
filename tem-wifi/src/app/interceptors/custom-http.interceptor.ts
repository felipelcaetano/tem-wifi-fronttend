import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.prod';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {};

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!environment.production) {
      console.log('Intercepting');
      console.log('token: ', this.authService.token)
    }    

    if(this.authService.token && !req.headers.has('NoAuth') && req.url.includes('amazonaws')) {
      // clone request 
      const secureReq = req.clone({
        headers: req.headers.set('Authorization', this.authService.token)
      });
      return next.handle(secureReq);
    } else {
      // clone request 
      const secureReq = req.clone({
        headers: req.headers.delete('NoAuth')
      });
      return next.handle(secureReq);
    };
  }
}