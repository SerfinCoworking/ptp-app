import { IEvent } from "./schedule";

export interface IPeriodMonitor{
  period: {
    _id: string;
    fromDate: string;
    toDate: string;
    objective: {
      _id: string;
      name: string;
    };
  };
  weeksEvents: IMonitorWeekMonth[];
}

export interface IMonitorWeekMonth{
  week: IMonitorWeek[];
}

export interface IMonitorWeek{
  day: IMonitorDay;
}
export interface IMonitorDay{
  date: string;
  dayEvents: IMonitorEmployee[];
}

export interface IMonitorEmployee{
  employee: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  events: IEvent[];
}