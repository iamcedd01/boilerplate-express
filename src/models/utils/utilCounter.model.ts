import { ICommonNameValue } from '@interfaces/common';
import { Model, model, Schema } from 'mongoose';

const UtilCounterSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    value: Schema.Types.Number,
  },
  {
    strict: true,
    timestamps: true,
  }
);

const UtilCounter: Model<ICommonNameValue> = model<ICommonNameValue>('UtilCounter', UtilCounterSchema, 'util_counters');

export default UtilCounter;
