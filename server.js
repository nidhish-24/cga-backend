import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import contactRoutes from "./routes/contactRoutes.js";
app.use("/api", contactRoutes);

import applyRoutes from "./routes/applyRoutes.js";
app.use("/api", applyRoutes);


import Contact from "./models/contact.js"; // ✅ Add model import to use DB

// ✅ Get All Messages (Admin)
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

// ✅ Delete Message (Admin)
app.delete("/api/delete/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting message" });
  }
});
