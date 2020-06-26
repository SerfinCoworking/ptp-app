import { IAddress, IServiceType } from '@interfaces/embedded.documents';
export interface IObjective {
  _id?: string;
  name: string;
  address: IAddress;
  serviceType: IServiceType[];
  description: string;
}
