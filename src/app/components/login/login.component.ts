import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { SessionService } from '../../services/Session.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  login: UserModel;
  userRemember = false;

  constructor( private auth: SessionService,
               private router: Router ) { }

  ngOnInit() {
    this.login = new UserModel();

    if ( localStorage.getItem('email') ) {
      this.login.email = localStorage.getItem('email');
      this.userRemember = true;
    }
  }

  userlogin( form: NgForm ) {
    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Cargando...'
    });
    Swal.showLoading();


    this.auth.logIn( this.login )
        .subscribe( resp => {
          Swal.close();
          if ( this.userRemember ) {
            localStorage.setItem('email', this.login.email);
          }
          this.router.navigateByUrl('/home');

        }, (msgError) => {
          Swal.fire({
            allowOutsideClick: false,
            type: 'error',
            title: 'Datos Incorrectos',
            text: 'Por favor verifica tus datos'
          });
        });
  }

}
