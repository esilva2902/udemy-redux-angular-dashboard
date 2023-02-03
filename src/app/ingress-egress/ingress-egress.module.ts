import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngressEgressComponent } from './ingress-egress.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    IngressEgressComponent,
    StatisticsComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IngressEgressComponent
  ]
})
export class IngressEgressModule { }
