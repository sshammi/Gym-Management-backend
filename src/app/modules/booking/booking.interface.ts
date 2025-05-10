import { Types } from "mongoose";

export interface IBooking{
  traineeId: Types.ObjectId;
  scheduleId: Types.ObjectId;
  status: 'booked' | 'cancelled' | 'completed';
}