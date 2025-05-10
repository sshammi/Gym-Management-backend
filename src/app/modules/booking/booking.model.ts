import { Schema, model } from 'mongoose';
import { IBooking} from './booking.interface';

const bookingSchema = new Schema<IBooking>(
  {
    traineeId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Trainee is required'],
    },
    scheduleId: {
      type: Schema.Types.ObjectId,
      ref: 'ClassSchedule',
      required: [true, 'Class schedule is required'],
    },
    status: {
      type: String,
      enum: ['booked', 'cancelled', 'completed'],
      default: 'booked',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookingSchema.index({ traineeId: 1, scheduleId: 1 }, { unique: true });

export const Booking = model<IBooking>('Booking', bookingSchema);