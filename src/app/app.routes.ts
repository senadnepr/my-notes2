import {Routes} from '@angular/router';
import {EmptyRoute} from "./empty-route/empty-route.component";
import {SignUpInComponent} from "./sign-up-in/sign-up-in.component";
import {ContentComponent} from "./content/content.component";
import {AuthComponent} from "./sign-up-in/auth/auth.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign',
    pathMatch: 'full',
  },
  // {path: 'sign', component: SignUpInComponent},
  {path: 'sign', component: AuthComponent},
  {path: 'content', component: ContentComponent},
  // {path: 'auth', component: AuthComponent},

  {path: '**', component: EmptyRoute}
];
