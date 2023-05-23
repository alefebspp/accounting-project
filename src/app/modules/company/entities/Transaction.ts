import { TransactionProps } from './interface';
import { randomUUID } from 'node:crypto';

export class Transaction {
  private _id: string;
  private props: TransactionProps;

  constructor(props: TransactionProps) {
    this.props = props;
    this._id = randomUUID();
  }

  public get id() {
    return this._id;
  }

  public get value() {
    return this.props.value;
  }

  public set value(value: number) {
    this.props.value = value;
  }

  public get description() {
    return this.props.description;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get date() {
    return this.props.date;
  }

  public set date(date: Date) {
    this.props.date = date;
  }

  public get company_id() {
    return this.props.company_id;
  }

  public set company_id(company_id: string) {
    this.props.company_id = company_id;
  }

  public get parcels() {
    return this.props.parcels;
  }

  public set parcels(parcels: number) {
    this.props.parcels = parcels;
  }

  public get type() {
    return this.props.type;
  }

  public set type(type: string) {
    this.props.type = type;
  }

  public get payment_type() {
    return this.props.payment_type;
  }

  public set payment_type(payment_type: string) {
    this.props.payment_type = payment_type;
  }

  public get finance_type() {
    return this.props.finance_type;
  }

  public set finance_type(finance_type: string) {
    this.props.finance_type = finance_type;
  }
}
