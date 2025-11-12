import mongoose from "mongoose";

const ApplySchema = new mongoose.Schema(
  {
    name: String,      // ✅ Add this
    email: String,
    phone: String,
    marks: Number,
    cutoff: Number,
    community: String,
    group: String,
    school: String,
    address: String,
    parentPhone: String
  },
  { timestamps: true }
);

export default mongoose.model("Apply", ApplySchema);
