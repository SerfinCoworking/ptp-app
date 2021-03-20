export interface IAction extends Document {
  name: string;
  completed?: boolean;
}
export default interface IRole extends Document {
  _id: string;
  name: string;
  actions: Array<IAction>;
  createdAt?: Date;
  updatedAt?: Date;
}

