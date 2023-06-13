const nodemailer = require("nodemailer");

async function main(email) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "elisabetsobeck11@gmail.com",
      pass: "fmxictgaiclpxenf",
    },
  });

  let detail = {
    from: '"Confirmation Email" <elisabetsobeck11@gmail.com>',
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
