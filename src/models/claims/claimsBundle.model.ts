import { EClaimsBundleStatus, IClaimsBundle } from '@interfaces/claims/IClaimsBundle';
import { model, Model, Schema } from 'mongoose';

const ClaimsBundleSchema = new Schema(
  {
    bundleNumber: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    officeLocation: {
      type: Schema.Types.String,
      default: 'Head Office',
    },

    soaDetail: {
      number: Schema.Types.String,
      amount: {
        type: Schema.Types.Number,
        required: true,
      },
    },

    encodedDate: {
      type: Schema.Types.Date,
      required: true,
      default: Date.now,
    },
    dueDate: {
      type: Schema.Types.Date,
      required: true,
    },
    receivedDate: {
      type: Schema.Types.Date,
      required: true,
    },
    actualReceivedDate: {
      type: Schema.Types.Date,
      required: true,
    },

    doctorDetail: {
      id: {
        type: Schema.Types.String,
        required: true,
      },
      name: {
        type: Schema.Types.String,
        required: true,
      },
    },
    facilityDetail: {
      id: {
        type: Schema.Types.String,
        required: true,
      },
      name: {
        type: Schema.Types.String,
        required: true,
      },
    },

    totalRcs: Schema.Types.Number,
    status: {
      type: Schema.Types.String,
      enum: EClaimsBundleStatus,
      default: EClaimsBundleStatus.InProgress,
    },

    users: {
      current: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      previous: [
        {
          type: Schema.Types.ObjectId,
          required: true,
        },
      ],
    },
  },
  { timestamps: true }
);

const ClaimsBundle: Model<IClaimsBundle> = model<IClaimsBundle>('ClaimsBundle', ClaimsBundleSchema);

export default ClaimsBundle;
