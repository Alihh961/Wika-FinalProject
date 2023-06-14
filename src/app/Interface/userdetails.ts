export interface UserInscription {

  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confPassword: string,
  birthdate: Date | null,
  gender: string,

}
export interface UserInscriptionAddress{
  
  buildingNumber: string,
  street: string, 
  municipality: string,
  postCode: string,
  departement: string,
  region: string 

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
