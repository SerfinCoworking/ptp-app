import { IAddress, IServiceType } from '@shared/models/embedded.documents';
export interface IDefaultSchedule {
  fromTime:{
    hour: number;
    minute: number;    
  },
  toTime:{
    hour: number;
    minute: number;    
  }
}
export interface IObjective {
  _id?: string;
  name: string;
  address: IAddress;
  serviceType: IServiceType[];
  description: string;
  avatar: string;
  identifier: string;
  defaultSchedules: IDefaultSchedule[];
}
