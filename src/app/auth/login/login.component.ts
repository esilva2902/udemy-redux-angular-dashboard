import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { AuthService } from '../auth.service';

export interface LoginFormGroup {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<LoginFormGroup>;

  constructor(
    private router: Router,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup<LoginFormGroup>({
      email: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      password: new FormControl<string>('', { validators: [Validators.required, Validators.minLength(8)], nonNullable: true }),
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;

      Swal.fire({
        title: 'Espere por favor',

        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.authService.login(email, password)
        .then(userCredentials => {
          console.log(userCredentials);
          Swal.close();
          this.router.navigate(['./']);
        })
        .catch(error => {
          console.error(error);

          Swal.fire({
            icon: 'error',
            title: 'Ha habido un error',
            text: error.message
          })
        });
    }
  }
}
