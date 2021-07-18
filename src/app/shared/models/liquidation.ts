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
export interface IEmployeeLiquidation {
  employee: IEmployeeLiq;
  total_day_in_hours: number;
  total_night_in_hours: number;
  total_in_hours: number;
  total_extra_in_hours: number;
  total_feriado_in_hours: number;
  total_suspension_in_hours: number;
  total_lic_justificada_in_hours: number;
  total_lic_no_justificada_in_hours: number;
  total_vaciones_in_days: number;
  total_adelanto_import: number;
  total_plus_responsabilidad: number;
  total_hours_work_by_week: IHoursByWeek[];
  total_viaticos: number;
  total_art_in_hours: number;
  total_art_by_working_day: Array<string>;
  total_lic_jus_by_working_day: Array<string>;
  total_lic_no_jus_by_working_day: Array<string>;
  total_suspension_by_working_day: Array<string>;
  total_capacitation_hours: number;
  total_lic_sin_sueldo_days: number;
  capacitaciones: INews[];
  plus_responsabilidad: INews[];
  suspensiones: INews[];
  lic_justificadas: INews[];
  lic_justificada_group_by_reason: ILicReason[],
  lic_no_justificadas: INews[];
  arts: INews[];
  presentismo: number;
  embargos: INews[];
  feriados: INews[];
  adelantos: INews[];
  vacaciones: INews[];
  licSinSueldo: INews[];
  currentStatus: INews;
}

// export default interface ILiquidation extends Document {
//   _id: string;
//   dateFrom: string;
//   dateTo: string;
//   employee_liquidation: IEmployeeLiquidation[];
//   createdAt?: Date;
//   updatedAt?: Date;
// }
export interface JsonData {
  name: string;
  value: string;
} 
interface ExcelCols{
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
  employees: ILiquidatedEmployee[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CalculatedHours {
  total: number;
  by: {day: number; night: number};
  extras: number;
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
    by_week: IHoursByWeek[];
  },
  hours_by_working_day: {

    lic_justificadas: Array<string>;
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
  }
  total_viaticos: number;

  lic_justificada_group_by_reason: ILicReason[],
  currentStatus: INews;
  liquidated_news: ILiquidatedNews;
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