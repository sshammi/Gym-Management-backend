import { Types } from "mongoose";

export interface IClassSchedule {
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  trainerId: Types.ObjectId;
  maxCapacity: number;
  status: 'active' | 'cancelled' | 'completed';
}