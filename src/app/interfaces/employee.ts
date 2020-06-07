import { IProfile, IContact } from '@interfaces/embedded.documents';
export interface IEmployee {
  enrollmnet: string;
  profile: IProfile;
  contact: IContact;
}
