import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../auth.service';

export interface RegisterFormGroup {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup<RegisterFormGroup>;

  constructor(
    private router: Router,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    this.registerForm = new FormGroup<RegisterFormGroup>({
      name: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
      email: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      password: new FormControl<string>('', { validators: [Validators.required, Validators.minLength(8)], nonNullable: true }),
    });
  }

  onCreateAccount(): void {
    if (this.registerForm.valid) {
      const name = this.registerForm.controls.name.value;
      const email = this.registerForm.controls.email.value;
      const password = this.registerForm.controls.password.value;

      Swal.fire({
        title: 'Espere por favor',

        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.authService.createUser(name, email, password)
        .then(() => {
          Swal.close();
          this.router.navigate(['./']);
        })
        .catch(error => {
          console.error(error);

          Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: error.message
          })
        });
    }
  }
}
