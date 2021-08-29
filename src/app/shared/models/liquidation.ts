import INews from "./news";
import { IEvent } from "./schedule";

export interface IEmployeeLiq extends Document {
  _id: string;
  enrollment: string;
  firstName: string;
  lastName: string;
  avatar: string;
  dni: string;
  cuilPrefix: string;
  cuilDni: string;
  cuilSufix: string;
  function: string;
  employer: string;
  art: string;
}

export interface IEventWithObjective {
  event: IEvent,
  objectiveName: string;
  diffInHours: number;
  dayHours: number;
  nightHours: number;
  feriadoHours: number;
}
export interface IHoursByWeek {
  from: moment.Moment;
  to: moment.Moment;
  totalHours: number;
  totalExtraHours: number;
  events?: IEventWithObjective[];
}

export interface ILicReason {
  key: string;
  name: string;
  assigned_hours: number
};

export interface JsonData {
  name: string;
  value: string;
}
export interface ExcelJson{
  data: Array<any>;
  header?: Array<string>;
  skipHeader?: boolean;
  origin?: string | number;
}

export interface LiquidationMonths {
  month: string;
  from?: moment.Moment;
  to?: moment.Moment
}


// ==================== V2 ======================
export default interface ILiquidation {
  _id?: string;
  dateFrom: string;
  dateTo: string;
  status: string;
  liquidatedEmployees: ILiquidatedEmployee[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CalculatedHours {
  total: number;
  by: {day: number; night: number};
  extras: number;
  by_week: IHoursByWeek[];
}

export interface ILiquidatedEmployee {
  employee: IEmployeeLiq;
  total_by_hours: {
    signed: CalculatedHours;
    schedule: CalculatedHours;
    news: {
      feriado: number;
      suspension: number;
      lic_justificada: number;
      lic_no_justificada: number;
      art: number;
      capacitaciones: number;
    };    
  },
  hours_by_working_day: {
    lic_justificadas: number;
    lic_no_justificas: Array<string>;
    suspension: Array<string>;
    art: Array<string>;
  },
  total_of_news: {
    vaciones_by_days: number;
    adelanto_import: number;
    plus_responsabilidad: number;
    lic_sin_sueldo_by_days: number;
    presentismo: number;
    embargo: number;
  }
  total_viaticos: number;

  lic_justificada_group_by_reason: ILicReason[],
  currentStatus: INews;
  liquidated_news_id: string;
}

export interface ILiquidatedNews {
  _id?: string;
  arts: INews[];
  capacitaciones: INews[];
  plus_responsabilidad: INews[];
  suspensiones: INews[];
  lic_justificadas: INews[];
  lic_no_justificadas: INews[];
  embargos: INews[];
  feriados: INews[];
  adelantos: INews[];
  vacaciones: INews[];
  licSinSueldo: INews[];
}