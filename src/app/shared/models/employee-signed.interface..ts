interface ISignedByPeriod {
  period_id: string;
  employee_id: string;
  signed: Date[];
  objective: {
    _id: string;
    name: string;
  }
}

export default interface IEmployeeSigned {
  _id: string;
  employee_liquidated_id: string;
  signed_by_period: ISignedByPeriod[];
  createdAt?: Date;
  updatedAt?: Date;
}

