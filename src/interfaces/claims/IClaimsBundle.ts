import { IDoctor } from '@interfaces/partners/IDoctor';
import { IFacility } from '@interfaces/partners/IFacility';

export enum EClaimsBundleStatus {
  InProgress = 'InProgress',
  Escalated = 'Escalated',
  Submitted = 'Submitted',
  Approved = 'Approved',
}

export interface ISoaDetails {
  number: string;
  amount: number;
}

export interface IClaimsBundle {
  bundleNumber: string;
  officeLocation?: string;

  soaDetails?: ISoaDetails;

  encodedDate: string;
  dueDate: string;
  receivedDate: string;
  actualReceivedDate: string;

  doctorDetails?: Pick<IDoctor, 'id' | 'profile'>;
  facilityDetails: Pick<IFacility, 'id' | 'name'>;

  totalRcs: number;
  status: EClaimsBundleStatus;
  users: {
    previous?: string[];
    current: string;
  };
}
