import nodemailer from "nodemailer";

import { utils } from "../../utils/index.js";

import { config } from "../../config/index.js";


export const sendMail = async (
params = {}
) => {

    const {
        email = "",
        token = "",
        type = "",
        activationCode = ""
    } = params

  const route= {
    account: "account_activation",
    password: "reset_password",
  };


  const emailUrlLink = `${config?.fe_url}/${route?.[type]}/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 587,
    auth: {
      user: config?.gmail_account,
      pass: config?.gmail_password,
    },
  });

  const subjectByType = {
    account: "Activate Your Account",
    password: "Reset Your Password",
  };

  const textByType = {
    account: `Hi ${email},
  
  Welcome to CommerceHub! We're thrilled to have you join our community.
  
  To activate your account, please click the link below:
  ${emailUrlLink}
  
  Use the following activation code when prompted: ${activationCode}
  
  If the link doesn't work, copy and paste this URL into your browser:
  ${emailUrlLink}
  
  Thank you for joining us!
  Best regards,
  The CommerceHub Team`,
  
    password: `Hi ${email},
  
  We received a request to reset your password. To proceed, please click the link below:
  ${emailUrlLink}
  
  If you are asked, you may need to enter this activation code: ${activationCode}
  
  If you did not request a password reset, please ignore this email. Your password will remain unchanged.
  
  Best regards,
  The CommerceHub Team`
  };
  

  const mailOptions = {
    from: `"Your App" <${config?.gmail_account}>`,
    to: email,
    subject: subjectByType?.[type],
    text: textByType?.[type],
  };

  const errorByType = {
    account: "Unable to send account activation email",
    password: "Unable to send password reset email",
  };

  try {

    const info = await transporter.sendMail(mailOptions);

    if (info?.accepted?.length) {
      return true
    }

    utils?.throw_new_error(500, errorByType?.[type]);
  } catch (error) {
    utils?.throw_new_error(500, errorByType?.[type]);
  }
  utils?.throw_new_error(500, "An unexpected error occurred");
};