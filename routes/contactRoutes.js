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

    // ✅ Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email to YOU
    await transporter.sendMail({
      from: email,
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
    res.status(500).json({
      success: false,
      message: "Error sending message ❌",
      error,
    });
  }
});

export default router;
