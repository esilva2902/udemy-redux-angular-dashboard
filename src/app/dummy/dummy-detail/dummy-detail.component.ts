import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { AppState } from 'src/app/app.reducer';
import { IngressEgressDoc } from 'src/app/models/ingress-egress.model';

@Component({
  selector: 'app-dummy-detail',
  templateUrl: './dummy-detail.component.html',
  styleUrls: ['./dummy-detail.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DummyDetailComponent {
  ingressEgressDocs: IngressEgressDoc[];

  private destroy$: Subject<void>;

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>) {

    this.ingressEgressDocs = [ ];
    this.destroy$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.store.select(appState => appState.ingressEgress).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: ingressEgressState => {
        this.ingressEgressDocs = ingressEgressState ? ingressEgressState.items : [ ];
        this.cdr.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
