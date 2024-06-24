import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {
  FormControl, FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "./auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ErrorStateMatcher} from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  loading = false;
  error = ''

  authForm = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', [Validators.required]),
  })

  emailFormControl = this.authForm.controls.emailFormControl;
  passwordFormControl = this.authForm.controls.passwordFormControl;

  matcher = new MyErrorStateMatcher();

  private userSub: Subscription | undefined;

  constructor(public authService: AuthService, public router: Router) {}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    // const email = form.value.email;
    const email = this.authForm.value.emailFormControl!.valueOf();
    const password = this.authForm.value.passwordFormControl!.valueOf();
    // const password = form.value.password;
    this.loading = true;

    console.log(email + password);

    if(this.isLoginMode){
      this.authService.login(email, password).subscribe({next: response => {
        this.loading = false;
        this.authService.autoLogout(3600000)
        this.router.navigate(["/content"])
        }, error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.error = error?.error?.message || "Такого e-mail не зареєстровано";
        } })
    } else {
      this.authService.signup(email, password).subscribe({next: response => {
          this.loading = false;
          this.authService.autoLogout(3600000)
          this.router.navigate(["/content"])
        }, error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.error = error?.error?.message || "Error Occurred";
        } })
    }
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
