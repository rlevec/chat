export const changeEmail = {
    header: "Change Your Email",
    description: "Update your email below. Make sure it meets the required format.",
    button: {
      id: 1,
      frontendSlug: "change_email",
      title: "Update Email",
      type: "submit"
    },
    fields: [
      {
        id: 1,
        order: 1,
        frontendSlug: "email",
        label: "Email Address",
        placeholder: "Enter your email address...",
        name: "email",
        type: "email",
        validator:
          '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
        validationMessage: "Please enter a valid email address.",
        requiredMessage: "Email is required!",
        required: true,
        inputType: "text",
      },     
      {
        id: 2,
        order: 2,
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
            frontendSlug: "chat",
            label: "Want to do this later?",
            labelWithLink: "Skip for now",
            route: "/chat",
        }
    ]
  };