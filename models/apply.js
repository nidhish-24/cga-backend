import mongoose from "mongoose";

const applySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  marks: { type: Number, required: true },
  cutoff: { type: Number, required: true },
  community: { type: String, required: true },
  group: { type: String, required: true },
  school: { type: String, required: true },
  address: { type: String, required: true },
  parentPhone: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Apply", applySchema);
