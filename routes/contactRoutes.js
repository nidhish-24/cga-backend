import express from "express";
import Contact from "../models/contact.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // ✅ Save message to database
    const newMessage = new Contact({ name, email, phone, message });
    await newMessage.save();

    // ✅ Attempt to send email (but do not fail if email fails)
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER, 
        replyTo: email,
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

      console.log("✅ Email Sent");

    } catch (emailError) {
      console.log("⚠ Email failed, but message saved:", emailError.message);
    }

    return res.json({
      success: true,
      message: "Message sent successfully ✅",
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


