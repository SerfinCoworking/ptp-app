export interface IUserMovement{
  _id: string;
  username: string;
  profile: {
      firstName: string;
      lastName: string;
      dni: string;
  }
}

export default interface IMovement{
  user: IUserMovement;
  action: string;
  resource: string;
  target: string;
  createdAt?: Date;
  updatedAt?: Date;
}
