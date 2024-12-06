import { Schema } from 'mongoose';

export const PartnerAddressSchema = {
  unitNo: Schema.Types.String,
  floor: Schema.Types.String,
  buildingNo: Schema.Types.String,
  buildingName: Schema.Types.String,
  street: Schema.Types.String,
  barangay: Schema.Types.String,
  province: Schema.Types.String,
  city: Schema.Types.String,
  region: Schema.Types.String,
  zip: Schema.Types.String,
  country: Schema.Types.String,
};

export const PartnerContactSchema = {
  landline: Schema.Types.String,
  directLine: Schema.Types.String,
  mobile: Schema.Types.String,
  email: Schema.Types.String,
  schedule: Schema.Types.String,
  coordinator: Schema.Types.String,
  mainCoordinator: Schema.Types.String,
  assistantCoordinator: Schema.Types.String,
  secretary: Schema.Types.String,
  remarks: Schema.Types.String,
};

export const PartnerLicenseDetailsSchema = {
  id: {
    type: Schema.Types.String,
    required: true,
  },
  type: {
    type: Schema.Types.String,
    required: true,
  },
  expirationDate: Schema.Types.Date,
};

export const PartnerPhilhealthDetailsSchema = {
  id: Schema.Types.String,
  expirationDate: Schema.Types.Date,
};

export const PartnerRemarksSchema = {
  external: Schema.Types.String,
  internal: Schema.Types.String,
};
