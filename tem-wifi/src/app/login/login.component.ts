import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { PostLoginRequest } from '../shared/models/login/post-login-request.model';
import { LoginService } from './login.service';
import { StorageService } from '../storage/storage.service';
import { StorageTemWiFi } from '../shared/models/login/storage-tem-wifi.model';
import { Router } from '@angular/router';
import { PostNewUserRequest } from '../shared/models/login/post-new-user-request.model';
import { Subscription } from 'rxjs';
import { AuthService as SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService, private storageService: StorageService, private router: Router,
    private socialAuthService: SocialAuthService) {

    this.socialUser = null;
    this.loginService.logout();
  }

  private socialUser: SocialUser;
  public provider: string = 'temwifi';
  private loggedIn: boolean;

  loginSubs: Subscription = new Subscription();
  loggingIn: boolean = false;
  error: string = '';
  isNewUser: boolean = false;

  matcher = new MyErrorStateMatcher();

  loginForm: FormGroup;
  newUserForm: FormGroup;

  @Output() login: EventEmitter<string> = new EventEmitter();

  onSubmitLogin({value}: {value: PostLoginRequest}, provider: string) {
    console.log('Login: ', value);

    this.loggingIn = true;
    this.error = '';

    value.provider = provider;
    this.loginService.login(value)
      .subscribe(
        resp => {
          console.log(resp);
          this.storageService.save('token', resp.token);

          const temWifi: StorageTemWiFi = {
            id: resp.id,
            email: value.user
          }

          this.storageService.save('tem-wifi', temWifi);
          this.loginService.emit(value.user);
          this.loggingIn = false;
          this.router.navigate(['/avaliacoes']);
        },
        error => {
          console.log(error)
          this.error = error.error.message ? error.error.message : error.error;
          this.loggingIn = false;
        }
      )
  }

  signInWithGoogle(): void {
    this.provider = 'google';
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.provider = 'facebook';
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  onSubmitNewUser({value}: {value: PostNewUserRequest}) {
    console.log(value);

    this.loggingIn = true;
    this.error = '';

    this.loginService.registerNewUser(value)
      .subscribe(
        resp => {
          console.log(resp);
          this.storageService.save('token', resp.token);

          const temWifi: StorageTemWiFi = {
            id: resp.id,
            email: resp.email
          }

          this.storageService.save('tem-wifi', temWifi);
          this.loginService.emit(resp.email);
          this.loggingIn = false;
          this.router.navigate(['/avaliacoes']);
        },
        error => {
          console.log(error)
          this.error = error.error.message ? error.error.message : error.error;
          this.loggingIn = false;
        }
        
      )
  }

  onClickNewUser(): void {
    this.isNewUser = true;
  }

  onClickBack(): void {
    this.isNewUser = false;
  }

  onKeyupPassCheck(event: any): void {

    if(event.target.value != this.newUserPass.value) {
      this.passCheck.setErrors({'invalid': true});
    } else {
      this.passCheck.setErrors(null);
    }

    console.log(this.newUserForm)
  }

  get user() { return this.loginForm.get('user'); }

  get pass() { return this.loginForm.get('pass'); }

  get newUser() { return this.newUserForm.get('newUser'); }

  get newUserPass() { return this.newUserForm.get('newPass'); }

  get passCheck() { return this.newUserForm.get('passCheck'); }  

  ngOnInit() {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required]
    })

    this.newUserForm = this.fb.group({
      newUser: ['', [Validators.required, Validators.email]],
      newPass: ['', Validators.required],
      passCheck: ['', Validators.required],
    })

    this.socialAuthService.authState.subscribe((user) => {
      console.log('New login Comp: ', user);

      if(!this.socialUser) {

        this.socialUser = user;
        this.loggedIn = (user != null);

        if(this.loggedIn) {

          this.onSubmitLogin({value: {user: user.email}}, user.provider.toLowerCase() );
        } 
      }
             
    });
  }

  ngOnDestroy() {
    this.loginSubs.unsubscribe();
  }

}
