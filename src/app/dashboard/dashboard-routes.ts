import { Routes } from '@angular/router';
import { DetailComponent } from '../ingress-egress/detail/detail.component';
import { IngressEgressComponent } from '../ingress-egress/ingress-egress.component';
import { StatisticsComponent } from '../ingress-egress/statistics/statistics.component';

export const dashboardRoutes: Routes = [
  { path: 'ingreso-egreso', component: IngressEgressComponent },
  { path: 'detalle', component: DetailComponent },
  { path: '', component: StatisticsComponent },
];
