import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { IngressEgressModule } from '../ingress-egress/ingress-egress.module';

import { DashboardComponent } from './dashboard.component';
@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,

    IngressEgressModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
