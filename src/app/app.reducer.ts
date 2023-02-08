import { ActionReducerMap } from '@ngrx/store';
import * as ui  from './shared/ui.reducer';
import * as auth  from './auth/auth.reducer';
import * as ingressEgress from './ingress-egress/ingress-egress.reducer';

export interface AppState {
  ui: ui.LoadingState,
  auth: auth.UserState
  ingressEgress: ingressEgress.IngressEgressState
}

// This object represents the Global state of the App:
export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.userReducer,
  ingressEgress: ingressEgress.ingressEgressReducer
}
