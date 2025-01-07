const nodemailer = require("nodemailer");

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // Use false for STARTTLS
    auth: {
      user: "82d120001@smtp-brevo.com",
      pass: process.env.EMAIL_PASS, // Ensure EMAIL_PASS is correctly set
    },
    tls: {
      rejectUnauthorized: false, // Optional: use for debugging; remove in production
    },
  });
  return transporter;
};

module.exports = { createMailTransporter };
