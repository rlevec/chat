export const resetPassword = {
    header: "Reset Your Password",
    description: "Enter your new password below to reset your account.",
    button: {
      id: 1,
      frontendSlug: "reset-password",
      title: "Reset Password",
      type: "submit",
    },
    fields: [
      {
        id: 1,
        order: 1,
        frontendSlug: "reset_code",
        label: "Activation Code",
        placeholder: "Enter the 6-digit code...",
        name: "reset_code",
        type: "number",
        min: 6,
        max: 6,
        validator: "^\\d{6}$",
        validationMessage: "Reset code must be 6 digits.",
        requiredMessage: "Reset code is required!",
        required: true,
        inputType: "text"
      },
      {
        id: 2,
        order: 2,
        isPassword: true,
        frontendSlug: "password",
        label: "New Password",
        placeholder: "Enter your new password...",
        name: "password",
        type: "password",
        validator: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$",
        validationMessage:
          "Password must be at least 8 characters long and contain at least one letter and one number.",
        requiredMessage: "Password is required!",
        required: true,
        inputType: "text",
        separateValidators: [
          {
            regex: "^.{8,100}$",
            message: "8 to 100 chars"
          },
          {
            regex: "[A-Z]",
            message: "Uppercase letter"
          },
          {
            regex: "[a-z]",
            message: "Lowercase letter"
          },
          {
            regex: "\\d",
            message: "Number"
          },
          {
            regex: "[@$!%*#?&]",
            message: "Special char"
          },
          {
            regex: "^[A-Za-z\\d@$!%*#?&]+$",
            message: "Valid characters only"
          }
        ],        
        validationPills: true,
      },
    ],
    links: [
      {
        id: 1,
        frontendSlug: "login",
        label: "Remembered your password?",
        labelWithLink: "Log In",
        route: "/login",
      },
      {
        id: 2,
        frontendSlug: "register",
        label: "Don't have an account?",
        labelWithLink: "Register",
        route: "/register",
      },
    ],
  };