// utils/email.js

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "hh.@gmail.com",
    pass: "hello",
  },
});

const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `http://localhost:3333/users/reset-password/${token}`;
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendPasswordResetEmail;
