import { Schema, Document } from 'mongoose';

export interface Log extends Document {
  taskId: string;
  action: string;
  actionDetail: string;
  timestamp: Date;
}

export const LogSchema = new Schema({
  taskId: { type: String, required: true },
  action: { type: String, required: true },
  actionDetail: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
