import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { DummyDetailComponent } from './dummy-detail/dummy-detail.component';

const routes: Route[] = [
  {
    path: '',
    component: DummyDetailComponent
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
export class DummyRoutingModule { }
