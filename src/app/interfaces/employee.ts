import { IProfile, IContact } from '@interfaces/embedded.documents';
export interface IEmployee {
  _id?: string;
  enrollment: string;
  profile: IProfile;
  contact: IContact;
}
