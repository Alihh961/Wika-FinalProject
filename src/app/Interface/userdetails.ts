export interface UserInscription {

  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confPassword: string,
  dateOfBirth: Date | null,
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

  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date | null;
  gender: string;
}
