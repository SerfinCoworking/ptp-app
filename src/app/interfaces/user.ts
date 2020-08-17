import { IProfile } from './embedded.documents';

export class IUser {
  _id?: string;
  username: string;
  password: string;
  email: string;
  role: string;
  profile: IProfile;
}
