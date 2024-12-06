/* eslint-disable no-dupe-keys */
import { ECommonStatus } from '@interfaces/common';
import {
  EFacilityAffiliationStatus,
  EFacilityClassification,
  EFacilityProcessType,
  EFacilityStatus,
  EFacilityType,
  IFacility,
} from '@interfaces/partners/IFacility';
import { EPartnerTinStatus, EPartnerVatStatus } from '@interfaces/partners/IPartner';
import { model, Model, Schema } from 'mongoose';
import {
  PartnerAddressSchema,
  PartnerContactSchema,
  PartnerLicenseDetailsSchema,
  PartnerPhilhealthDetailsSchema,
  PartnerRemarksSchema,
} from './partner.model';

const FacilitySchema = new Schema(
  {
    id: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    type: {
      type: Schema.Types.String,
      enum: EFacilityType,
      default: EFacilityType.Hospital,
    },
    status: {
      type: Schema.Types.String,
      enum: EFacilityStatus,
      default: EFacilityStatus.Inactive,
    },

    classification: {
      type: Schema.Types.String,
      enum: EFacilityClassification,
      default: null,
    },
    processType: {
      type: Schema.Types.String,
      enum: EFacilityProcessType,
      default: null,
    },
    tinStatus: {
      type: Schema.Types.String,
      enum: EPartnerTinStatus,
      default: null,
    },
    vatStatus: {
      type: Schema.Types.String,
      enum: EPartnerVatStatus,
      default: null,
    },

    fullAddress: Schema.Types.String,
    address: PartnerAddressSchema,
    contact: PartnerContactSchema,

    affiliationDetails: {
      id: {
        type: Schema.Types.String,
        required: true,
        unique: true,
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
        enum: EFacilityAffiliationStatus,
        default: EFacilityAffiliationStatus.InProgress,
      },
    },
    licenseDetails: [PartnerLicenseDetailsSchema],
    philhealthDetails: PartnerPhilhealthDetailsSchema,

    standardRates: [
      {
        status: {
          type: Schema.Types.String,
          enum: ECommonStatus,
          default: ECommonStatus.Active,
        },
        facilityCptCode: { type: Schema.Types.String, required: true },
        facilityProcedure: { type: Schema.Types.String, required: true },
        cptCode: { type: Schema.Types.String, required: true },
        procedure: { type: Schema.Types.String, required: true },
        opd: { type: Schema.Types.Number, default: 0 },
        standard: { type: Schema.Types.Number, default: 0 },
        roomType: { type: Schema.Types.ObjectId, required: true, ref: 'RoomType' },
        price: { type: Schema.Types.Number, required: true },
        effectivityDate: { type: Schema.Types.Date, required: true, default: new Date() },
        remarks: Schema.Types.String,
      },
    ],
    roomAndBoards: [
      {
        roomId: { type: Schema.Types.ObjectId, required: true, ref: 'RoomType' },
        roomCode: { type: Schema.Types.String, required: true },
        roomType: { type: Schema.Types.String, required: true },
        description: Schema.Types.String,
        price: { type: Schema.Types.Number, default: 0 },
        status: {
          type: Schema.Types.String,
          enum: ECommonStatus,
          default: ECommonStatus.Active,
        },
        effectivityDate: { type: Schema.Types.Date, required: true, default: new Date() },
        remarks: Schema.Types.String,
      },
    ],

    remarks: PartnerRemarksSchema,
  },
  {
    strict: true,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Facility: Model<IFacility> = model<IFacility>('Facility', FacilitySchema);

export default Facility;
