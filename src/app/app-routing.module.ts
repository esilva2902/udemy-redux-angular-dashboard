import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', pathMatch : 'full', redirectTo: 'dummy' },
  { path: 'inicio-sesion', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  {
    path: '',
    canMatch: [ AuthGuard ],
    canActivate: [AuthGuard ],
    children: [
      { path: 'gastos', loadChildren: () => import('./ingress-egress/ingress-egress.module').then(m => m.IngressEgressModule) }
    ]
  },

  {
    path: '',
    canMatch: [ AuthGuard ],
    canActivate: [AuthGuard ],
    children: [
      { path: 'dummy', loadChildren: () => import('./dummy/dummy.module').then(m => m.DummyModule) }
    ]
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
