import ejs from "ejs";
import fs from "fs";
import transporter from "../config/nodemailer";
import logger from "../config/logger";
// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();
import path from "path";

const sendRegistrationEmail = async (userEmail: string, username: string) => {
  try {
    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      "registration_template.ejs"
    );
    const template = fs.readFileSync(templatePath, "utf-8");
    const compiledTemplate = ejs.compile(template);
    const html = compiledTemplate({ username: username });

    const mailOptions = {
      from: "u1901091@rajagiri.edu.in",
      to: userEmail,
      subject: "Welcome to Our Website!",
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.log("error:", "Email sent: " + info.response);
    return null;
  } catch (error) {
    logger.log("error", "Error sending email:", error);
    return error.message;
  }
};

export default { sendRegistrationEmail };
