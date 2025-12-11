export const login = {
    header: "Log In to Your Account",
    description: "Enter your credentials to access your account.",
    button: {
      id: 1,
      frontendSlug: "login",
      title: "Log In",
      type: "submit"
    },
    fields: [
      {
        id: 1,
        order: 1,
        frontendSlug: "login_identifier",
        label: "Email Address or Username",
        placeholder: "Enter your email address or username...",
        name: "login_identifier",
        type: "text",
        validator:
        '^(?:[a-zA-Z0-9_]{3,15}|(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,})))$',
        validationMessage: "Please enter a valid username or email address.",
        requiredMessage: "Email or username is required!",
        required: true,
        inputType: "text"
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
      }
    ],
    links: [
      {
        id: 1,
        frontendSlug: "register",
        label: "Don't have an account?",
        labelWithLink: "Register",
        route: "/register"
      },
      {
        id: 2,
        frontendSlug: "resend-code",
        label: "Didn't receive activation code?",
        labelWithLink: "Resend it",
        route: "/resend_activation"
      },
      {
        id: 3,
        frontendSlug: "forgot-password",
        label: "Forgot your password?",
        labelWithLink: "Reset it",
        route: "/forgot_password"
      },
    ]
  };