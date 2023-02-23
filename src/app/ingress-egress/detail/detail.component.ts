import { ChangeDetectionStrategy, Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';

import { finalize, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { AppState } from 'src/app/app.reducer';
import * as uiActions from '../../shared/ui.actions';
import * as ingressEgressActions from '../ingress-egress.actions';

import { IngressEgressDoc } from 'src/app/models/ingress-egress.model';
import { IngressEgressService } from '../ingress-egress.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit, OnDestroy {
  ingressEgressDocs: IngressEgressDoc[];

  private destroy$: Subject<void>;

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>,
    private ingressEgressService: IngressEgressService) {

    this.ingressEgressDocs = [ ];
    this.destroy$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.store.select(appState => appState.ingressEgress).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: ingressEgressState => {
        this.ingressEgressDocs = ingressEgressState ? ingressEgressState.items : [ ];
        this.cdr.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteIngressEgressItem(id: string): void {
    this.store.dispatch(uiActions.isLoading());

    this.ingressEgressService.deleteIngressEgressItem(id).pipe(
      finalize(() => this.store.dispatch(uiActions.stopLoading()))

    ).subscribe({
      next: () => {
        Swal.fire('Operación exitosa', 'Registro eliminado.', 'success');
      },
      error: e => {
        console.error(e);
        Swal.fire('Error', e.message, 'error');
      }
    });
  }
}
