import { createAction, props } from '@ngrx/store';
import { IngressEgressDoc } from '../models/ingress-egress.model';

export const unsetItems = createAction(
  '[IngressEgress] Unset Items'
);

export const setItems = createAction(
  '[IngressEgress] Set Items',
  props<{ items: IngressEgressDoc[] }>()
);
