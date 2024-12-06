/* eslint-disable no-dupe-keys */
import { ECommonCivilStatus, ECommonGender } from '@interfaces/common';
import {
  EDoctorAffiliationStatus,
  EDoctorSpecializationType,
  EDoctorStatus,
  EDoctorType,
  IDoctor,
} from '@interfaces/partners/IDoctor';
import { model, Model, Schema } from 'mongoose';
import {
  PartnerAddressSchema,
  PartnerContactSchema,
  PartnerLicenseDetailsSchema,
  PartnerPhilhealthDetailsSchema,
  PartnerRemarksSchema,
} from './partner.model';

const DoctorSchema = new Schema(
  {
    id: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    type: {
      type: Schema.Types.String,
      enum: EDoctorType,
      default: EDoctorType.Doctor,
    },
    status: {
      type: Schema.Types.String,
      enum: EDoctorStatus,
      default: EDoctorStatus.Inactive,
    },

    fullName: Schema.Types.String,
    profile: {
      firstName: {
        type: Schema.Types.String,
        required: true,
      },
      middleName: Schema.Types.String,
      lastName: Schema.Types.String,
      suffix: Schema.Types.String,
      birthDate: {
        type: Schema.Types.Date,
        required: true,
      },
      gender: {
        type: Schema.Types.String,
        enum: ECommonGender,
      },
      civilStatus: {
        type: Schema.Types.String,
        enum: ECommonCivilStatus,
      },
      emailAddress: {
        type: Schema.Types.String,
        required: true,
      },
      contactNumber: {
        type: Schema.Types.String,
        required: true,
      },
    },

    fullAddress: Schema.Types.String,
    address: PartnerAddressSchema,
    contact: PartnerContactSchema,

    affiliationDetails: {
      id: {
        type: Schema.Types.String,
        required: true,
      },
      stage: [
        {
          name: {
            type: Schema.Types.String,
            required: true,
          },
          date: {
            type: Schema.Types.Date,
            required: true,
          },
        },
      ],
      status: {
        type: Schema.Types.String,
        enum: EDoctorAffiliationStatus,
        default: EDoctorAffiliationStatus.InProgress,
      },
    },
    licenseDetails: [PartnerLicenseDetailsSchema],
    philhealthDetails: PartnerPhilhealthDetailsSchema,
    remarks: PartnerRemarksSchema,

    specializations: [
      {
        code: {
          type: Schema.Types.String,
          required: true,
        },
        name: {
          type: Schema.Types.String,
          required: true,
        },
        type: {
          type: Schema.Types.String,
          enum: EDoctorSpecializationType,
          default: EDoctorSpecializationType.Other,
        },
      },
    ],
  },
  {
    strict: true,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Doctor: Model<IDoctor> = model<IDoctor>('Doctor', DoctorSchema);

export default Doctor;
