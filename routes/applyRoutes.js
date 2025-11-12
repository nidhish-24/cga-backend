import express from "express";
import Apply from "../models/apply.js";

const router = express.Router();

// ✅ Submit Application
router.post("/apply", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      marks,
      cutoff,
      community,
      group,
      school,
      address,
      parentPhone
    } = req.body;

    const newApplication = new Apply({
      name,         // ✅ Save name properly
      email,
      phone,
      marks,
      cutoff,
      community,
      group,
      school,
      address,
      parentPhone
    });

    await newApplication.save();

    res.json({ success: true, message: "Application submitted ✅" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Error saving application ❌",
    });
  }
});

// ✅ Get All Applications
router.get("/applications", async (req, res) => {
  try {
    const apps = await Apply.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: "Error fetching applications" });
  }
});

// ✅ Delete Application
router.delete("/applications/:id", async (req, res) => {
  try {
    await Apply.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Application deleted ✅" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting application" });
  }
});

export default router;
