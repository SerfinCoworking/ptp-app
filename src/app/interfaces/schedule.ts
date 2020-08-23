import { PaginationResult } from '@interfaces/pagination';

export interface IEvent{
  fromDatetime: string;
  toDatetime: string;
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
