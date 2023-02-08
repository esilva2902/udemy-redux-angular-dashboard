import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IngressEgressComponent } from './ingress-egress.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { OrderItemsPipe } from './order-items.pipe';

@NgModule({
  declarations: [
    IngressEgressComponent,
    StatisticsComponent,
    DetailComponent,
    OrderItemsPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NgChartsModule
  ],
  exports: [
    IngressEgressComponent
  ]
})
export class IngressEgressModule { }
