import { Any } from "./Any"

export interface IUser {
  "email": string | null,
  "email_verified_at": string | null
  "id": number,
  "username": string
  "account_type": IAccountType 
}

export enum IAccountType {
  SuperAdmin = 0,
  Admin = 1,
  Doctor = 2,
  Patient = 3,
  
}

export const accountTypeNameToCode = Object.freeze({
  "patient": IAccountType.Patient,
  "doctor": IAccountType.Doctor,
  "admin": IAccountType.Admin,
  "superadmin": IAccountType.SuperAdmin,
});

export const accountTypeCodeToName = Object.freeze({
  [IAccountType.Patient]: "Patient",
  [IAccountType.Doctor]: "Training Provider",
  [IAccountType.Admin]: "Admin",
  [IAccountType.SuperAdmin]: "Superadmin",
});

export type IAccountTypeName = keyof typeof accountTypeNameToCode;
