import express from "express";
import Contact from "../models/contact.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Save to DB
    const newMessage = new Contact({ name, email, phone, message });
    await newMessage.save();

    // Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // ✅ FIXED
      replyTo: email,              // ✅ Use user's email here
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      text: `
New message from Website:

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
      `,
    });

    res.json({
      success: true,
      message: "Message sent successfully ✅",
    });

  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({
      success: false,
      message: "Error sending message ❌",
    });
  }
});

export default router;

