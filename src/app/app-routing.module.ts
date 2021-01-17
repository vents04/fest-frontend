import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUrlComponent } from './pages/add-url/add-url.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UnknowErrorComponent } from './pages/unknow-error/unknow-error.component';
import { UrlComponent} from './pages/url/url.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'url/:id', component: UrlComponent},
  {path: '', component: DashboardComponent},
  {path: 'add-url', component: AddUrlComponent},
  {path: 'unknown-error', component: UnknowErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
