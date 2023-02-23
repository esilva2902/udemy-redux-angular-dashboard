import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DummyDetailComponent } from './dummy-detail/dummy-detail.component';
import { DummyRoutingModule } from './dummy-routing.module';

@NgModule({
  declarations: [
    DummyDetailComponent
  ],
  imports: [
    CommonModule,
    DummyRoutingModule
  ]
})
export class DummyModule { }
