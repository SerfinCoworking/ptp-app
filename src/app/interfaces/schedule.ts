import { PaginationResult } from '@interfaces/pagination';

export interface IChangesEvent{
  newEvents: IEvent[];
  oldEvents: IEvent[];
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
  checkin?: Date;
  checkout?: Date;
}
export interface IEvent{
  fromDatetime: string;
  toDatetime: string;
  checkin?: Date;
  checkout?: Date;
}

export interface IShift {
  employee: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  events: IEvent[];
}

export interface IPeriod {
  _id?: string;
  fromDate: string;
  toDate: string;
  shifts: IShift[];
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
