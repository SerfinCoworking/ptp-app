export interface IScheduleTemplate{
  day: string;
  firstTime: string;
  secondTime: string;
}

export interface ITemplate {
  _id?: string;
  name: string;
  schedule: IScheduleTemplate[];
}
