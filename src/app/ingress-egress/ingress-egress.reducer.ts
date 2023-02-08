import { createReducer, on } from '@ngrx/store';
import { IngressEgressDoc } from '../models/ingress-egress.model';
import { setItems, unsetItems } from './ingress-egress.actions';

export interface IngressEgressState {
  items: IngressEgressDoc[];
};

export const initialState: IngressEgressState = {
  items: []

};

export const ingressEgressReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items: [ ...items ] })),
  on(unsetItems, state => ({ ...state, items: [ ] }))
);
