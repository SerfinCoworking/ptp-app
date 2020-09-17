import { IProfile, IContact } from '@interfaces/embedded.documents';
export interface IEmployee {
  _id?: string;
  enrollment: string;
  rfid: number;
  profile: IProfile;
  contact: IContact;
}
