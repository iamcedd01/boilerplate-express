import { ECommonCivilStatus, ECommonGender } from '@interfaces/common';
import {
  IPartnerAddress,
  IPartnerAffiliation,
  IPartnerContact,
  IPartnerLicenseDetails,
  IPartnerPhilhealthDetails,
  IPartnerRemarks,
} from './IPartner';

export enum EDoctorSpecializationType {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Other = 'Other',
}

export enum EDoctorAffiliationStatus {
  InProgress = 'InProgress',
  Submitted = 'Submitted',
  ForReview = 'ForReview',
  Approved = 'Approved',
  Disapproved = 'Disapproved',
}

export enum EDoctorStatus {
  Processing = 'Processing',
  Active = 'Active',
  Inactive = 'Inactive',
  OnHold = 'OnHold',
}

export enum EDoctorType {
  Dentist = 'Dentist',
  Doctor = 'Doctor',
}

export interface IDoctorAffiliation extends IPartnerAffiliation {
  status: EDoctorAffiliationStatus;
}

export interface IDoctorProfile {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  birthDate: Date;
  gender: ECommonGender;
  civilStatus: ECommonCivilStatus;
  emailAddress: string;
  contactNumber: string;
}

export interface IDoctorSpecialization {
  code: string;
  name: string;
  type: EDoctorSpecializationType;
}

export interface IDoctor {
  id: string;
  type: EDoctorType;
  status: EDoctorStatus;

  fullName: string;
  profile: IDoctorProfile;

  fullAddress: string;
  address: IPartnerAddress;
  contact: IPartnerContact;

  affiliationDetails: IDoctorAffiliation;
  philhealthDetails: IPartnerPhilhealthDetails;
  licenseDetails: IPartnerLicenseDetails[];

  specializations: IDoctorSpecialization[];

  officeLocation?: string;
  remarks?: IPartnerRemarks;
}
