import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { setUser, unSetUser } from './auth.actions';

export interface UserState {
  user: User | null;
};

export const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ user: { ...user } })),
  on(unSetUser, state => ({ user: null })),
);
