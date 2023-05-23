import { CompanyProps } from './interface';
import { randomUUID } from 'node:crypto';

export class Company {
  private _id: string;
  private props: CompanyProps;

  constructor(props: CompanyProps) {
    this.props = props;
    this._id = randomUUID();
  }

  public get id() {
    return this._id;
  }

  public get balance() {
    return this.props.balance;
  }

  public set balance(balance: number) {
    this.props.balance = balance;
  }

  public get cnpj() {
    return this.props.cnpj;
  }

  public set cnpj(cnpj: string) {
    this.props.cnpj = cnpj;
  }

  public get corporate_name() {
    return this.props.corporate_name;
  }

  public set corporate_name(corporate_name: string) {
    this.props.corporate_name = corporate_name;
  }

  public get fantasy_name() {
    return this.props.fantasy_name;
  }

  public set fantasy_name(fantasy_name: string) {
    this.props.fantasy_name = fantasy_name;
  }

  public get primary_cnae() {
    return this.props.primary_cnae;
  }

  public set primary_cnae(primary_cnae: string) {
    this.props.primary_cnae = primary_cnae;
  }

  public get primary_cnae_description() {
    return this.props.primary_cnae_description;
  }

  public set primary_cnae_description(primary_cnae_description: string) {
    this.props.primary_cnae_description = primary_cnae_description;
  }

  public get foundation_date() {
    return this.props.foundation_date;
  }

  public set foundation_date(foundation_date: Date) {
    this.props.foundation_date = foundation_date;
  }

  public get status() {
    return this.props.status;
  }

  public set status(status: string) {
    this.props.status = status;
  }
}
