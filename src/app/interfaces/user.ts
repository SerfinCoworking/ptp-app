import { IProfile } from './embedded.documents';

export class IUser {
  _id?: string;
  username: string;
  password: string;
  email: string;
  rfid: string;
  role: string;
  profile: IProfile;
}
