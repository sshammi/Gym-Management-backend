import { Schema, model } from 'mongoose';
import { IClassSchedule} from './classSchedule.interface';

const classScheduleSchema = new Schema<IClassSchedule>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
    },
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Trainer is required'],
    },
    maxCapacity: {
      type: Number,
      default: 10,
      min: [1, 'Capacity must be at least 1'],
      max: [10, 'Capacity cannot exceed 10'],
    },
    status: {
      type: String,
      enum:['active', 'cancelled', 'completed'],
      default: 'active',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ClassSchedule = model<IClassSchedule>('ClassSchedule',classScheduleSchema);