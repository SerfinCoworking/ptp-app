import { IProfile, IContact } from '@shared/models/embedded.documents';

export enum Status { 
  ALTA = 'ALTA', 
  ACTIVO = 'ACTIVO', 
  BAJA = 'BAJA'
}
export interface IEmployee {
  _id?: string;
  enrollment: string;
  rfid: number;
  profile: IProfile;
  contact: IContact;
  status:  Status;
}

export interface IEmployeeShort {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
