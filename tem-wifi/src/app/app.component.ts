import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { awsBaseUrl, httpOptions } from './shared/constants/constants';
import { RouterOutlet, Router } from '@angular/router';
import { slideInAnimation } from './animations';
import { LoginService } from './login/login.service';
import { AuthService } from './auth/auth.service';
import { StorageService } from './storage/storage.service';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tem-wifi';
  mobileQuery: MediaQueryList;

  public email: string = '';

  menuSearchForm: FormGroup;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private http: HttpClient, private loginService: LoginService, private router: Router,
    private authService: AuthService, private storageService: StorageService, private fb: FormBuilder) {

    this.mobileQuery = media.matchMedia('(max-width: 759)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnInit(): void {
    this.menuSearchForm = this.fb.group({
      searchInput: ['']
    })

    this.http.post(awsBaseUrl+"/infra/warmup", null, httpOptions)
     .subscribe(
        response => {},
        error => console.log(error)
      );

      this.authService.isAuthenticated()
        .then(isAuth => {
          if(isAuth) {
            this.storageService.get('tem-wifi')
              .subscribe(
                resp => {
                  console.log('data: ' + JSON.stringify(resp));
                  this.email = resp.email;
                },
                error => console.log(error)
              )
  
          } else {
            this.subscribeLogin();
          }
        })
          
  }

  onClickLogout() {
    this.loginService.logout();
    this.email = '';
    this.subscribeLogin();
    this.router.navigate(['/login']);
  }
  
  subscribeLogin(): void {
    this.loginService.login$.subscribe(email => {
      console.log(email)
      this.email = email})
  }

  get searchInput() { return this.menuSearchForm.get('searchInput'); }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
