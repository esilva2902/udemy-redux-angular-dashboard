import { Pipe, PipeTransform } from '@angular/core';
import { IngressEgressDoc } from '../models/ingress-egress.model';

@Pipe({
  name: 'orderItems'
})
export class OrderItemsPipe implements PipeTransform {

  transform(value: IngressEgressDoc[]): IngressEgressDoc[] {
    // The received array reference is read-only...
    const items = [ ...value ];
    /**
     * We change the array reference because the sort method mutates the given array.
     * The V8 throws an error.
     */
    items.sort((a, b) => a.type === 'ingreso' ? -1 : 1);

    return items;
  }
}
