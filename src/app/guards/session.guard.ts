import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor( private auth: SessionService, private router: Router ) {}

  canActivate(): boolean {
    if ( this.auth.verify() ) {
        console.log('simon');
        return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
