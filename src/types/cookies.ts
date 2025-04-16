export enum IAccountType {
  SuperAdmin = 'SUPER_ADMIN',
  Admin = 'ADMIN',
  Doctor = 'DOCTOR',
  Patient = 'PATIENT'
}

export interface CookiesValue {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    account_type: IAccountType;
  };
}

export const ALL_ADMINS = [
  IAccountType.SuperAdmin,
  IAccountType.Admin,
];
