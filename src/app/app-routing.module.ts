import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { dashboardRoutes } from './dashboard/dashboard-routes';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'inicio-sesion', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate: [
      AuthGuard
    ]

      // { path: 'dash', loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule) },

  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
