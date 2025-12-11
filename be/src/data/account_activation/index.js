export const accountActivation = {
    header: "Activate Your Account",
    description: "Enter the 6-digit code sent to your email to activate your account.",
    button: {
      id: 1,
      frontendSlug: "activate",
      title: "Activate",
      type: "submit"
    },
    fields: [
      {
        id: 1,
        order: 1,
        frontendSlug: "activation_code",
        label: "Activation Code",
        placeholder: "Enter the 6-digit code...",
        name: "activation_code",
        type: "number",
        min: 6,
        max: 6,
        validator: "^\\d{6}$",
        validationMessage: "Activation code must be 6 digits.",
        requiredMessage: "Activation code is required!",
        required: true,
        inputType: "text"
      }
    ],
    links: [
      {
        id: 1,
        frontendSlug: "resend-code",
        label: "Didn't receive the code?",
        labelWithLink: "Resend it",
        route: "/resend_activation"
      },
      {
        id: 2,
        frontendSlug: "login",
        label: "Already activated your account?",
        labelWithLink: "Log in",
        route: "/login"
      }
    ]
  };