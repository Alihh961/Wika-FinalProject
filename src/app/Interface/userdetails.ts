export interface UserInscription {

  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confPassword: string,
  birthdate: Date | null,
  gender: string,
  postCode: string,

  street: string,
  buildingNumber: string,
}

export interface AddressComp {
  region: string,
  departement: string,
  municipality: string,
}

export interface loginDataType {
  logemail: string,
  logpassword: string
}

export interface loggedInUserInfo {

  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: Date | null;
  street: string;
  buildingnumber: string;
  gender: string;
  isAdmin: boolean;
}
