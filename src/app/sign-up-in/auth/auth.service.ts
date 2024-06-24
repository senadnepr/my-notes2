import {Injectable} from '@angular/core';
import {BehaviorSubject, map, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

export interface Root {
  records: Record[]
}

export interface Record {
  id: string
  createdTime: string
  fields: User
}

export interface User {
  email: string
  password: string
  id: number
}

const headerDict = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer patE1rBtTnfZpVwXq.ba65519bbc9e9137a069df4a9d65770a485b07d0b74fe4d97d7274ccad5bafcc',
}

const requestOptions = {
  headers: new HttpHeaders(headerDict),
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject = new BehaviorSubject<User | null>(null);
  private tokenExpirationTime: number | undefined

  get user() {
    return this.userSubject.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {
  }

  //
  // signup(email: string, password: string){
  //   return this.http.post<User>('http://localhost:3000/signup', {email, password}).pipe(tap(response => {
  //     this.handleAuthentication(response.email, response.password);
  //   }))
  // }

  signup(email: string, password: string) {

    return this.http.post<Root>('http://localhost:3000/signup', {email, password})
      .pipe(tap(response => {
        this.handleAuthentication(
          response.records[0].fields.email,
          response.records[0].fields.password,
        response.records[0].fields.id);
      }))


  }

  // login(email: string, password: string){
  //   return this.http.post<User>('http://localhost:3000/login', {email, password}).pipe(tap(response => {
  //     this.handleAuthentication(response.email, response.password);
  //   }))
  // }

  login(email: string, password: string) {

    return this.http.get<Root>(
      `https://api.airtable.com/v0/appnppyeIa1h1dlLR/Users?filterByFormula={email}='${email}'&{password}='${password}'`,
      requestOptions
    )
      .pipe(
        tap(response => {
          this.handleAuthentication(
            response.records[0].fields.email,
            response.records[0].fields.password,
            response.records[0].fields.id);

        }),
        map(response => (response.records[0].fields.email, response.records[0].fields.password)),
      )
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData') || '');
    if (!userData) {
      return
    }
    this.userSubject.next(userData);
    this.autoLogout(3600)
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTime) {
      clearInterval(this.tokenExpirationTime);
    }
    this.router.navigate(['/sign']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }


  private handleAuthentication(email: string, password: string, id: number) {
    console.log(email + ':' + password);
    const user: User = {email, password, id}
    this.userSubject.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
