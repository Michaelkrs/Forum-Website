const nodemailer = require("nodemailer");
require("dotenv").config();

async function main(email) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let detail = {
    from: `"Confirmation Email" <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject: "Account Registered",
    text: "You have registered",
    html: "<b>Thank you for registering to our website</b>",
  };

  mailTransporter.sendMail(detail, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email has been sent");
    }
  });
}

module.exports = main;
