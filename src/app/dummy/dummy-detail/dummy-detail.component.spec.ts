import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyDetailComponent } from './dummy-detail.component';

describe('DummyDetailComponent', () => {
  let component: DummyDetailComponent;
  let fixture: ComponentFixture<DummyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
