import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2'

import { AppState } from 'src/app/app.reducer';
import * as uiActions from '../../shared/ui.actions';

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
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup<LoginFormGroup>;

  isLoading: boolean;

  private destroy$: Subject<void>;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService) {

    this.isLoading = false;
    this.destroy$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup<LoginFormGroup>({
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

  onLogin(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;

      // Show the waiting button:
      this.store.dispatch(uiActions.isLoading());

      this.authService.login(email, password)
        .then(() => {
          // Swal.close();
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
