import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ShellComponent } from './shell/shell.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { IngressEgressComponent } from './ingress-egress.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', component: StatisticsComponent },
      { path: 'ingreso-egreso', component: IngressEgressComponent },
      { path: 'detalle', component: DetailComponent },
    ]
  }
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
export class IngressEgressRoutingModule { }
