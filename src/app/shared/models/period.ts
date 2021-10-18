import { IEvent } from "./schedule";

export interface IPeriodPlanning{
  weeksEvents: IPlanningEmployee[];
}


export interface IPlanningEmployee{
  employee: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  totalHs: number;
  weeks
  events: IEvent[];
}

// Printer interface
export interface IPeriodDay {
  date: string;
  events: Array<IEvent>;
}

export interface IPeriodByEmployeeByWeek{
  employee: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  week: IPeriodDay[];
}

export interface IPeriodWeekGroupByEmployee {
  employeesWeek: IPeriodByEmployeeByWeek[];
}

export interface IPeriodPrint {
  period: {
    _id: string;
    fromDate: string;
    toDate: string;
    objective: {
      _id: string;
      name: string;
    };
  };
  weeksEvents: Array<IPeriodWeekGroupByEmployee>;
}
