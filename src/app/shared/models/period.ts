import { IEmployeeShort } from "./employee";
import { IObjective } from "./objective";
import { IEvent } from "./schedule";

export interface IPeriodPlanning{
  weeksEvents: IPlanningEmployee[];
}


export interface IPlanningEmployee{
  employee: IEmployeeShort;
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
  employee: IEmployeeShort;
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
  objective: IObjective;
  weeksEvents: Array<IPeriodWeekGroupByEmployee>;
}
