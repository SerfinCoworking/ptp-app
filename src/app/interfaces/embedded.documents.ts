export interface IProfile {
  avatar: string;
  dni: string;
  firstName: string;
  lastName: string;
}

export interface IAddress {
  street: string;
  city: string;
  country: string;
  zip: string;
}

export interface IPhone {
  area: string;
  line: string;
}

export interface IContact {
  address: IAddress;
  phones: IPhone[];
  email: string;
}

export interface IServiceType {
  name: string;
  hours: number;
}

export interface IRole {
  value: string;
  viewValue: string;
}
