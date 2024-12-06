export interface IPartnerAddress {
  unitNo: string;
  floor: string;
  buildingNo: string;
  buildingName: string;
  street: string;
  barangay: string;
  province: string;
  city: string;
  region: string;
  zip: string;
  country: string;
}

export interface IPartnerStage {
  name: string;
  date: string;
}

export interface IPartnerAffiliation {
  id: string;
  stage?: IPartnerStage[];
}

export interface IPartnerContact {
  landline?: string;
  directLine?: string;
  mobile?: string;
  email?: string;
  schedule?: string;
  coordinator?: string;
  mainCoordinator?: string;
  assistantCoordinator?: string;
  secretary?: string;
  remarks?: string;
}

export interface IPartnerPhilhealthDetails {
  accreditationNumber: string;
  expirationDate: Date;
}

export interface IPartnerLicenseDetails {
  id: string;
  type?: string;
  expirationDate?: Date;
}

export interface IPartnerRemarks {
  external?: string;
  internal?: string;
}

export enum EPartnerTinStatus {
  ZeroRated = 'ZeroRated',
  Government = 'Government',
  Others = 'Others',
}

export enum EPartnerVatStatus {
  Vatable = 'Vatable',
  NonVatable = 'NonVatable',
}
