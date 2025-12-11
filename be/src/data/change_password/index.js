export const changePassword = {
  header: "Change Your Password",
  description:
    "Enter your current password and choose a new one that meets the security requirements listed below.",
  button: {
    id: 1,
    frontendSlug: "change_password",
    title: "Update Password",
    type: "submit",
  },
  fields: [
    {
      id: 1,
      order: 1,
      isPassword: true,
      frontendSlug: "password",
      label: "Password",
      placeholder: "Enter your password...",
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
          message: "8 to 100 chars",
        },
        {
          regex: "[A-Z]",
          message: "Uppercase letter",
        },
        {
          regex: "[a-z]",
          message: "Lowercase letter",
        },
        {
          regex: "\\d",
          message: "Number",
        },
        {
          regex: "[@$!%*#?&]",
          message: "Special char",
        },
        {
          regex: "^[A-Za-z\\d@$!%*#?&]+$",
          message: "Valid characters only",
        },
      ],
      validationPills: true,
    },
    {
      id: 2,
      order: 2,
      isPassword: true,
      frontendSlug: "new_password",
      label: "New Password",
      placeholder: "Enter your new password...",
      name: "password",
      type: "password",
      validator: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$",
      validationMessage:
        "Password must be at least 8 characters long and contain at least one letter and one number.",
      requiredMessage: "New password is required!",
      required: true,
      inputType: "text",
      separateValidators: [
        {
          regex: "^.{8,100}$",
          message: "8 to 100 chars",
        },
        {
          regex: "[A-Z]",
          message: "Uppercase letter",
        },
        {
          regex: "[a-z]",
          message: "Lowercase letter",
        },
        {
          regex: "\\d",
          message: "Number",
        },
        {
          regex: "[@$!%*#?&]",
          message: "Special char",
        },
        {
          regex: "^[A-Za-z\\d@$!%*#?&]+$",
          message: "Valid characters only",
        },
      ],
      validationPills: true,
    },
  ],
  links: [
    {
      id: 1,
      frontendSlug: "chat",
      label: "Want to do this later?",
      labelWithLink: "Skip for now",
      route: "/chat",
    },
  ],
};
