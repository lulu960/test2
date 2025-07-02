import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  summary: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Summary', summarySchema);
