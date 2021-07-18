export interface IAction extends Document {
  name: string;
  nameDisplay: string;
  observation: string;
  completed?: boolean;
}
export default interface IRole extends Document {
  _id: string;
  name: string;
  nameDisplay: string;
  actions: Array<IAction>;
  createdAt?: Date;
  updatedAt?: Date;
}

