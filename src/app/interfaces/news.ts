import { IEmployee } from './employee';

export interface INewsConcept extends Document {
  _id?: string;
  name: string;
  key: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default interface INews extends Document {
  _id?: string;
  dateFrom: Date; // fecha incio novedad
  dateTo: Date; // fecha fin novedad: puede ser la misma que la de inicio (1 dia)
  target?: IEmployee; // 1 empleado o todos
  concept: {
    _id?: string;
    name: string;
    key: string;
  };
  reason?: string; // justificacion falta
  acceptEventAsign?: boolean; // permite editar eventos de la grilla
  acceptUpdateEmployee?: boolean; // actualiza el estado del empleado BAJA | ALTA
  import?: number; // importe en pesos opcional
  observation?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

