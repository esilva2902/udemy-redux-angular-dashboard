import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';

import { filter, Subject, switchMap, takeUntil, EMPTY } from 'rxjs';

import { AppState } from '../app.reducer';
import * as ingressEgressActions from '../ingress-egress/ingress-egress.actions';

import { IngressEgressService } from '../ingress-egress/ingress-egress.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void>;

  constructor(
    private store: Store<AppState>,
    private ingressEgressService: IngressEgressService) {

    this.destroy$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.store.select(appState => appState.auth)
      .pipe(
        filter(auth => !!auth.user),
        switchMap(auth => !!auth.user ? this.ingressEgressService.getIngressEgressItems(auth.user.uid) : EMPTY),
        takeUntil(this.destroy$))

      .subscribe({
        next: items => {
          console.log(items);
          this.store.dispatch(ingressEgressActions.setItems({ items }));
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
