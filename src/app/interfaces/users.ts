import { IProfile } from './embedded.documents';

export class IUser {
  _id?: string;
  username: string;
  email: string;
  role: string;
  profile: IProfile;
}
