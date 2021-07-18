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
  function: string;
  art: string;
  birthdate: string;
  nationality: string;
  maritalStatus: string;
  sonsCount: number;
  studyLevel: string;
  observations: string;
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