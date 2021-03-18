import { IProfile } from './embedded.documents';

export interface IUserRolePermission extends Document{
  name: string;
};
export interface IUserRole extends Document{
  name: string;
  permissions: Array<IUserRolePermission>;
};
export class IUser {
  _id?: string;
  username: string;
  password: string;
  email: string;
  rfid: string;
  roles: Array<IUserRole>;
  profile: IProfile;
}
