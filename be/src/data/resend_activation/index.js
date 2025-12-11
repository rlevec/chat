export const resendActivation = {
    header: "Resend Activation Code",
    description: "Enter your email address and we’ll send you a new 6-digit activation code.",
    button: {
      id: 1,
      frontendSlug: "resend",
      title: "Resend Code",
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
        inputType: "text"
      },
    ],
    links: [
      {
        id: 1,
        frontendSlug: "login",
        label: "Already activated your account?",
        labelWithLink: "Log in",
        route: "/login"
      },
      {
        id: 2,
        frontendSlug: "register",
        label: "Don't have an account?",
        labelWithLink: "Register",
        route: "/register"
      },
    ]
  };