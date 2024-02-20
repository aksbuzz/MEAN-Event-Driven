import mongoose from 'mongoose';

interface MarketingDoc extends mongoose.Document {
  email: string;
  userId: string;
  sendEmail: boolean;
}

const MarketingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  userId: { type: String, required: true },
  sendEmail: { type: Boolean, required: false, default: true },
});

export const Marketing = mongoose.model<MarketingDoc>('Marketing', MarketingSchema);
