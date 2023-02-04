import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { AppState } from 'src/app/app.reducer';
import * as uiActions from '../../shared/ui.actions';

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
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup<RegisterFormGroup>;

  isLoading: boolean;

  private destroy$: Subject<void>;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService) {

    this.isLoading = false;
    this.destroy$ = new Subject<void>;
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup<RegisterFormGroup>({
      name: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
      email: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      password: new FormControl<string>('', { validators: [Validators.required, Validators.minLength(8)], nonNullable: true }),
    });

    this.store.select(appState => appState.ui).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: uiState => this.isLoading = uiState.isLoading
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCreateAccount(): void {
    if (this.registerForm.valid) {
      const name = this.registerForm.controls.name.value;
      const email = this.registerForm.controls.email.value;
      const password = this.registerForm.controls.password.value;

      this.store.dispatch(uiActions.isLoading());

      this.authService.createUser(name, email, password)
        .then(() => {
          this.store.dispatch(uiActions.stopLoading());
          this.router.navigate(['./']);
        })
        .catch(error => {
          console.error(error);
          this.store.dispatch(uiActions.stopLoading());

          this.cdr.markForCheck();

          Swal.fire({
            icon: 'error',
            title: 'Ha habido un error',
            text: error.message
          });
        });
    }
  }
}
