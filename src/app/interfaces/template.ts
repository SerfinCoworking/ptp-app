import {ThemePalette} from '@angular/material/core';

export interface STime {
  from: {
    hour: string;
    minute: string;
  };
  to: {
    hour: string;
    minute: string;
  };
}
export interface Day {
  name: string;
  completed: boolean;
  color: ThemePalette;
  firstTime?: STime;
  secondTime?: STime;
}
export interface Week {
  name: string;
  completed: boolean;
  color: ThemePalette;
  days?: Day[];
}
export interface IScheduleTemplate{
  day: string;
  firstTime: STime;
  secondTime: STime;
}

export interface ITemplate {
  _id?: string;
  name: string;
  schedule: IScheduleTemplate[];
}
