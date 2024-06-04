import nodemailer from "nodemailer";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: process.env.service,
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
