export enum ECommonStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export enum ECommonGender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum ECommonCivilStatus {
  Single = 'Single',
  Married = 'Married',
  Widowed = 'Widowed',
  Divorced = 'Divorced',
}

export interface ICommonNameValue {
  name: string;
  value: string | number;
}
