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

export interface UserInfo {

    firstname :string ,
    lastname :string,

}

export interface Cathe {

    email:string,
    password:string
}