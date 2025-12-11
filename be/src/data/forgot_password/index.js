export const forgotPassword = {
  header: "Forgot Your Password?",
  description:
    "Enter your email address and we’ll send you a link to reset your password.",
  button: {
    id: 1,
    frontendSlug: "forgot-password",
    title: "Send Reset Link",
    type: "submit",
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
  ],
  links: [
    {
      id: 1,
      frontendSlug: "register",
      label: "Don't have an account?",
      labelWithLink: "Register",
      route: "/register",
    },
    {
      id: 2,
      frontendSlug: "login",
      label: "Remembered your password?",
      labelWithLink: "Log In",
      route: "/login",
    },
  ],
};
