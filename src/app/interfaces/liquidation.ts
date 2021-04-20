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

export default interface ILiquidation extends Document {
  _id: string;
  dateFrom: string;
  dateTo: string;
  employee_liquidation: IEmployeeLiquidation[];
  createdAt?: Date;
  updatedAt?: Date;
}
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
