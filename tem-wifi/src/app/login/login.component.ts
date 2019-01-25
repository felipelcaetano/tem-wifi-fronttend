import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { PostLoginRequest } from '../shared/models/login/post-login-request.model';
import { LoginService } from './login.service';
import { StorageService } from '../storage/storage.service';
import { StorageTemWiFi } from '../shared/models/login/storage-tem-wifi.model';
import { Router } from '@angular/router';
import { PostNewUserRequest } from '../shared/models/login/post-new-user-request.model';

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

  constructor(private fb: FormBuilder, private loginService: LoginService, private storageService: StorageService, private router: Router) {
    this.loginService.logout();
  }

  loggingIn: boolean = false;
  error: string = '';
  isNewUser: boolean = false;

  matcher = new MyErrorStateMatcher();

  loginForm: FormGroup;
  newUserForm: FormGroup;

  @Output() login: EventEmitter<string> = new EventEmitter();

  onSubmitLogin({value}: {value: PostLoginRequest}) {
    console.log(value);

    this.loggingIn = true;
    this.error = '';

    this.loginService.login(value)
      .subscribe(
        resp => {
          console.log(resp);
          this.storageService.save('token', resp.token);

          const loterica: StorageTemWiFi = {
            id: resp.id,
            email: resp.email
          }

          this.storageService.save('tem-wifi', loterica);
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

  onSubmitNewUser({value}: {value: PostNewUserRequest}) {
    console.log(value);

    this.loggingIn = true;
    this.error = '';

    this.loginService.registerNewUser(value)
      .subscribe(
        resp => {
          console.log(resp);
          this.storageService.save('token', resp.token);

          const loterica: StorageTemWiFi = {
            id: resp.id,
            email: resp.email
          }

          this.storageService.save('tem-wifi', loterica);
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
  }

}
