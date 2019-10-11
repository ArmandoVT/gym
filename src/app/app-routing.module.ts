import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailComponent } from './components/detail/detail.component';
import { SessionGuard } from './guards/session.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [ SessionGuard ] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'detail/:id', component: DetailComponent, canActivate: [ SessionGuard ] },
  { path: '', pathMatch: 'full', redirectTo: '/home'  },
  { path: '**', pathMatch: 'full', redirectTo: '/home'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
