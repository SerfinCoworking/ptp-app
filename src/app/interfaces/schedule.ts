import { PaginationResult } from '@interfaces/pagination';

export interface IEvent {
  fromDatetime: Date;
  toDatetime: Date;
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

//  one schedule and one period
export interface ICalendar {
  period: PaginationResult<IPeriod>;
  days: string[];
}

export interface ICalendarList {
  schedules: PaginationResult<ISchedule>;
  calendars: ICalendar[];
}

