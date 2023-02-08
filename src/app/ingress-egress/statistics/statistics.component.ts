import { Subject, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { ChartData, ChartEvent, ChartType } from 'chart.js';

import { AppState } from 'src/app/app.reducer';
import { AmountType, IngressEgressDoc, IngressEgressIndex } from 'src/app/models/ingress-egress.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit, OnDestroy {
  ingressEgressIndex: IngressEgressIndex;

  // Doughnut
  doughnutChartLabels: string[] = [ 'Ingreso', 'Egreso' ];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [ ]
  };

  doughnutChartType: ChartType = 'doughnut';

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
    this.store.select(appState => appState.ingressEgress).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: ingressEgressState => {
        this.getTotals(ingressEgressState.items);
        this.cdr.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTotals(ingressEgressItems: IngressEgressDoc[]): void {
    // Before calculating the totals, clear variables:
    this.ingressEgressIndex['ingreso' as AmountType] = { itemsQty: 0, itemsTotal: 0 };
    this.ingressEgressIndex['egreso' as AmountType] = { itemsQty: 0, itemsTotal: 0 };

    ingressEgressItems.forEach(item => {
      this.ingressEgressIndex[item.type].itemsQty++;
      this.ingressEgressIndex[item.type].itemsTotal += item.amount;
    });

    this.doughnutChartData.datasets = [ {
      data: [
        this.ingressEgressIndex['ingreso' as AmountType].itemsTotal,
        this.ingressEgressIndex['egreso' as AmountType].itemsTotal
      ] }
    ];
  }
}
