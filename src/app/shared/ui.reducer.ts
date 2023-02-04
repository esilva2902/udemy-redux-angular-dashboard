import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface LoadingState {
  isLoading: boolean;
}

export const initialState: LoadingState = {
  isLoading: false
}

export const uiReducer = createReducer(
  initialState,
  on(isLoading, state => ({ ...state, isLoading: true })),
  on(stopLoading, state => ({ ...state, isLoading: false })),
);
