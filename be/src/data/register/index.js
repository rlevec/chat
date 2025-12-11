export const register = {
    header: "Create Your Account",
    description: "Complete all fields below to set up your account.",
    button: {
      id: 1,
      frontendSlug: "register",
      title: "Create Account",
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
        frontendSlug: "username",
        label: "Username",
        placeholder: "Enter your username...",
        name: "username",
        type: "text",
        validator: "^[a-zA-Z0-9_]{3,15}$",
        validationMessage:
          "Please enter a valid username (3-15 characters, only letters, numbers, and underscores).",
        requiredMessage: "Username is required!",
        required: true,
        inputType: "text",
      },          
      {
        id: 3,
        order: 3,
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
        frontendSlug: "login",
        label: "Already have an account?",
        labelWithLink: "Log In",
        route: "/login"
      }
    ]
  };