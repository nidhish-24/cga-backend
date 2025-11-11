import express from "express";
import Apply from "../models/apply.js";

const router = express.Router();


router.post("/apply", async (req, res) => {
  try {
    const newApplication = new Apply(req.body);
    await newApplication.save();

    res.json({ success: true, message: "Application submitted ✅" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving application ❌",
      error,
    });
  }
});
// ✅ Fetch all applications (Admin)
router.get("/applications", async (req, res) => {
  try {
    const apps = await Apply.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: "Error fetching applications" });
  }
});

// ✅ Delete an application
router.delete("/applications/:id", async (req, res) => {
  try {
    await Apply.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Application deleted ✅" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting application" });
  }
});


export default router;
