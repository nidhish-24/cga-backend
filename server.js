import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ✅ CORS
app.use(cors({
  origin: [
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    "https://cga-frontend-smoky.vercel.app",
    "https://cga-frontend-git-main-shankar-nidhishs-projects.vercel.app"
  ],
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));



app.use(express.json());

// ✅ Import routes FIRST
import contactRoutes from "./routes/contactRoutes.js";
import applyRoutes from "./routes/applyRoutes.js";

// ✅ Use routes BEFORE starting server
app.use("/api", contactRoutes);
app.use("/api", applyRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Admin fetch messages
import Contact from "./models/contact.js"; 

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

// ✅ Delete message
app.delete("/api/delete/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Message deleted ✅" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting message" });
  }
});

// ✅ Start server AFTER routes + DB
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
