import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { finalize, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { AppState } from '../app.reducer';
import * as uiActions from '../shared/ui.actions';

import { AmountType, IngressEgress } from '../models/ingress-egress.model';

import { IngressEgressService } from './ingress-egress.service';

export interface IngressEgressFormGroup {
  description: FormControl<string>;
  amount: FormControl<number | null>;
}

@Component({
  selector: 'app-ingress-egress',
  templateUrl: './ingress-egress.component.html',
  styleUrls: ['./ingress-egress.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngressEgressComponent implements OnInit, OnDestroy {
  ingressEgressForm: FormGroup<IngressEgressFormGroup>;
  amountType: AmountType;

  isLoading: boolean;

  private destroy$: Subject<void>;

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>,
    private ingressEgressService: IngressEgressService) {

    this.amountType = 'egreso';
    this.isLoading = false;
    this.destroy$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.ingressEgressForm = new FormGroup<IngressEgressFormGroup>({
      description: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
      amount: new FormControl<number | null>(null, Validators.required)
    });

    this.store.select(appState => appState.ui).pipe(
      takeUntil(this.destroy$)

    ).subscribe({
      next: value => {
        this.isLoading = value.isLoading;
        this.cdr.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChangeAmountType(newType: AmountType): void {
    this.amountType = newType;
  }

  onAddAmount(): void {
    if (this.ingressEgressForm.valid) {
      this.store.dispatch(uiActions.isLoading());

      const newIngressEgress = new IngressEgress(
        this.ingressEgressForm.controls.description.value,
        this.ingressEgressForm.controls.amount.value ?? 0,
        this.amountType
      );

      this.ingressEgressService.addIngressEgress(newIngressEgress).pipe(
        finalize(() => this.store.dispatch(uiActions.stopLoading()))
      )
        .subscribe({
          next: docRef => {
            console.log('Registro exitoso: ',docRef);
            this.ingressEgressForm.reset();

            Swal.fire('Registro exitoso',
              this.ingressEgressForm.controls.description.value, 'success');
          },
          error: e => {
            console.error(e);
            Swal.fire('Error', e.message, 'error');
          }
        }
      );
    }
  }
}

