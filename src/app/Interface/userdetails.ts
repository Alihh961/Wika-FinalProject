export interface UserInscription {

    firstname: string,
    lastname:string,
    email:string,
    password:string,
    passwordconfirmation:string,
    birthdate:Date | null,
    street:string,
    buildingnumber:string,
    gender:string,
}

export interface loginDataType {
    logemail: string,
    logpassword: string
}
