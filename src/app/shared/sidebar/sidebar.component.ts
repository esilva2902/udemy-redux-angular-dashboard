import { ChangeDetectionStrategy, Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Subject, takeUntil, filter, map } from 'rxjs';

import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy {

  userName: string;

  private destroy$: Subject<void>;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService) {

    this.userName = '';
    this.destroy$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.store.select(appState => appState.auth).pipe(
      takeUntil(this.destroy$)

    ).subscribe({
      next: authState => {
        this.userName = authState.user ? authState.user.name : '';
        this.cdr.markForCheck();
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['./inicio-sesion']),
      error: (e) => console.error(e)
    });
  }
}
