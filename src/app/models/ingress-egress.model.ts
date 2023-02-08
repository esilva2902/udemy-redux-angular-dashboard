export type AmountType = 'ingreso' | 'egreso';

export class IngressEgress {

  constructor(
    public description: string,
    public amount: number,
    public type: AmountType) {

  }
}

export class IngressEgressDoc extends IngressEgress {
  constructor(
    description: string,
    amount: number,
    type: AmountType,
    public id: string) {
    super(description, amount, type);
  }
}

export interface IngressEgressTotals {
  itemsQty: number;
  itemsTotal: number;
}

export interface IngressEgressIndex {
  [ key: string ]: IngressEgressTotals;
}
