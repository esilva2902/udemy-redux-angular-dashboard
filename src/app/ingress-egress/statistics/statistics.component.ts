import { Subject } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import { AmountType, IngressEgressDoc, IngressEgressIndex } from 'src/app/models/ingress-egress.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit {
  ingressEgressIndex: IngressEgressIndex;

  private destroy$: Subject<void>;

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>) {

    this.ingressEgressIndex = {};
    this.ingressEgressIndex['ingreso' as AmountType] = { itemsQty: 0, itemsTotal: 0 };
    this.ingressEgressIndex['egreso' as AmountType] = { itemsQty: 0, itemsTotal: 0 };

    this.destroy$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.store.select(appState => appState.ingressEgress)
      .subscribe({
        next: ingressEgressState => {
          this.getTotals(ingressEgressState.items);
          this.cdr.markForCheck();
        }
      });
  }

  getTotals(ingressEgressItems: IngressEgressDoc[]): void {
    ingressEgressItems.forEach(item => {
      this.ingressEgressIndex[item.type].itemsQty++;
      this.ingressEgressIndex[item.type].itemsTotal += item.amount;
    });
  }
}
