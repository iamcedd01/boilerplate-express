import { IDoctor } from '@interfaces/partners/IDoctor';
import { IFacility } from '@interfaces/partners/IFacility';

export enum EClaimsBundleStatus {
  InProgress = 'InProgress',
  Escalated = 'Escalated',
  Submitted = 'Submitted',
  Approved = 'Approved',
}

export interface ISoaDetail {
  number: string;
  amount: number;
}

export interface IClaimsBundle {
  bundleNumber: string;
  officeLocation?: string;

  soaDetail?: ISoaDetail;

  encodedDate: string;
  dueDate: string;
  receivedDate: string;
  actualReceivedDate: string;

  doctorDetail?: IDoctor;
  facilityDetail: IFacility;

  totalRcs: number;
  status: EClaimsBundleStatus;
  users: {
    previous?: string[];
    current: string;
  };
}
