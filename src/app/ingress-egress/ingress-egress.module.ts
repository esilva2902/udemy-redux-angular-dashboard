import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { NgChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { IngressEgressRoutingModule } from './ingress-egress-routing.module';

import * as ingressEgress from './ingress-egress.reducer';

import { IngressEgressComponent } from './ingress-egress.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { OrderItemsPipe } from './order-items.pipe';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [
    IngressEgressComponent,
    StatisticsComponent,
    DetailComponent,
    OrderItemsPipe,
    ShellComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,

    StoreModule.forFeature('ingressEgress', ingressEgress.ingressEgressReducer),

    NgChartsModule,
    IngressEgressRoutingModule
  ]
})
export class IngressEgressModule { }
