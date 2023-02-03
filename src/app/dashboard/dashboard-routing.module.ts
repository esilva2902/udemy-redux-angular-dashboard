import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from '../ingress-egress/statistics/statistics.component';
import { IngressEgressComponent } from '../ingress-egress/ingress-egress.component';
import { DetailComponent } from '../ingress-egress/detail/detail.component';

const routes: Routes = [
  { path: 'ingreso-egreso', component: IngressEgressComponent },
  { path: 'detalle', component: DetailComponent },
  { path: '', component: StatisticsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
