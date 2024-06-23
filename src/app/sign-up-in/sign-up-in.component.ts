import { Component } from '@angular/core';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sign-up-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-up-in.component.html',
  styleUrl: './sign-up-in.component.scss'
})
export class SignUpInComponent {

  isLoginMode: boolean = true;
  loading: boolean = false;
  error: string ='';

  private userSub?: Subscription;

  onSwitchMode(): void {
    // if(!form.valid){
    //   return;
    // }
    // const  email = form.value.email;
    // const password = form.value.password
  }
}
