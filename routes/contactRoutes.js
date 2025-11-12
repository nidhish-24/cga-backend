import express from "express";
import Contact from "../models/contact.js";
import twilio from "twilio";

const router = express.Router();

// Twilio client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // ✅ Save message to DB
    const newMessage = new Contact({ name, email, phone, message });
    await newMessage.save();

    // ✅ Send SMS to admin
    try {
      await client.messages.create({
        body: `📩 New Admission Enquiry\n\n👤 ${name}\n📧 ${email}\n📱 ${phone}\n📝 ${message}`,
        from: process.env.TWILIO_PHONE,
        to: process.env.ADMIN_PHONE,
      });

      console.log("✅ SMS sent to admin");
    } catch (smsError) {
      console.log("⚠ SMS failed but message saved");
    }

    return res.json({
      success: true,
      message: "Message submitted successfully ✅",
    });

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error ❌",
    });
  }
});

export default router;


