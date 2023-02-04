import { ActionReducerMap } from '@ngrx/store';
import * as ui  from './shared/ui.reducer';
import * as auth  from './auth/auth.reducer';

export interface AppState {
  ui: ui.LoadingState,
  auth: auth.UserState
}

// This object represents the Global state of the App:
export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.userReducer
}
