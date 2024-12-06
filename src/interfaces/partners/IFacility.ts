import { ECommonStatus } from '@interfaces/common';
import {
  EPartnerTinStatus,
  EPartnerVatStatus,
  IPartnerAddress,
  IPartnerAffiliation,
  IPartnerContact,
  IPartnerLicenseDetails,
  IPartnerPhilhealthDetails,
  IPartnerRemarks,
} from './IPartner';

export enum EFacilityAffiliationStatus {
  InProgress = 'InProgress',
  Submitted = 'Submitted',
  Processing = 'Processing',
  Processed = 'Processed',
  ForReview = 'ForReview',
  Approved = 'Approved',
  Disapproved = 'Disapproved',
}

export enum EFacilityProcessType {
  Umbrella = 'Umbrella',
  Regular = 'Regular',
}

export enum EFacilityClassification {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Tertiary = 'Tertiary',
}

export enum EFacilityStatus {
  Processing = 'Processing',
  Active = 'Active',
  Inactive = 'Inactive',
  OnHold = 'OnHold',
}

export enum EFacilityType {
  Hospital = 'Hospital',
  MedicalClinic = 'MedicalClinic',
  DentalClinic = 'DentalClinic',
}

export interface IFacilityAffiliation extends IPartnerAffiliation {
  status: EFacilityAffiliationStatus;
}

export interface IFacilityStandardRate {
  status: ECommonStatus;
  facilityCptCode: string;
  facilityProcedure: string;
  cptCode: string;
  procedure: string;
  opd: number;
  standard: number;
  roomType: string;
  price: number;
  effectivityDate: Date;
  remarks?: string;
}

export interface IFacilityRoomAndBoard {
  roomId: string;
  roomCode: string;
  roomType: string;
  description: string;
  price: number;
  status: ECommonStatus;
  effectivityDate: Date;
  remarks?: string;
}

export interface IFacility {
  id: string;
  name: string;
  type: EFacilityType;
  status: EFacilityStatus;

  classification: EFacilityClassification;
  processType: EFacilityProcessType;

  fullAddress: string;
  address: IPartnerAddress;
  contact: IPartnerContact;

  affiliationDetails: IFacilityAffiliation;
  licenseDetails: IPartnerLicenseDetails;
  philhealthDetails: IPartnerPhilhealthDetails;

  standardRates: IFacilityStandardRate[];
  roomAndBoards: IFacilityRoomAndBoard[];

  tinStatus?: EPartnerTinStatus;
  vatStatus?: EPartnerVatStatus;

  officeLocation?: string;
  remarks?: IPartnerRemarks;
}
