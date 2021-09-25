import { PaginationResult } from '@shared/models/pagination';

export interface IChangesEvent{
  newEvents: IEvent[];
  oldEvents: IEvent[];
}
export interface ITimeSelection{
  fromDate: {
    time: {
      hour: number | string;
      minute: number | string;
    };
  };
  toDate: {
    time: {
      hour: number | string;
      minute: number | string;
    };
  };
}

export interface IDialogEvent{
  fromDate: {
    day: string;
    time: {
      hour: number;
      minute: number;
    };
  };
  toDate: {
    day: string;
    time: {
      hour: number;
      minute: number;
    };
  };
  checkin?: string;
  checkout?: string;
  origin?: boolean;
}
export interface IDialogSignedEvent{
  checkin: {
    day: string;
    time: {
      hour: number;
      minute: number;
    };
    edit: boolean;
  };
  checkout: {
    day: string;
    time: {
      hour: number;
      minute: number;
    };
    edit: boolean;
  };
  fromDatetime: string;
  toDatetime: string;
  checkinDescription?: string;
  checkoutDescription?: string;
}
export interface IEvent{
  fromDatetime: string;
  toDatetime: string;
  checkin?: string;
  checkinDescription?: string;
  checkout?: string;
  checkoutDescription?: string;
  corrected?: boolean;
  origin?: boolean;
  color?: {
    r: number;
    g: number;
    b: number;
    a: number;
    hex: string;
    rgba: string;
  };
  name?: string;
}

export interface IShift {
  employee: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  events?: IEvent[];
  otherEvents?: IEvent[];
}

export interface IPeriod {
  _id?: string;
  fromDate: string;
  toDate: string;
  shifts?: IShift[];
  objective: {
    _id: string;
    name: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISchedule {
  _id?: string;
  objective: {
    _id: string;
    name: string;
  };
  lastPeriod: string;
  lastPeriodMonth: string;
  lastPeriodRange: {
    fromDate: string;
    toDate: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICalendarBuilder {
  schedule: ISchedule;
  period: PaginationResult<IPeriod>;
  days: string[];
}
export interface ICalendarList {
  docs: ICalendarBuilder[];
  total: number;
  limit: number;
  page?: number;
  pages?: number;
  offset?: number;
}
