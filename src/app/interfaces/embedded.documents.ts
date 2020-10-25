export interface IProfile {
  avatar: string;
  dni: string;
  firstName: string;
  lastName: string;
  cuilPrefix: string;
  cuilDni: string;
  cuilSufix: string;
  admissionDate: string;
  employer: string;
}

export interface IAddress {
  street?: string;
  city?: string;
  zip?: string;
  streetNumber?: string;
  department?: string;
  manz?: string;
  lote?: string;
  neighborhood?: string;
  province?: string;
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
