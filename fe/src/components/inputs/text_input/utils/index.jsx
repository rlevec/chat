export const allPillsValidated = (params) => {
    const { validators = [], value = "" } = params || {};

    return validators?.every((validator) =>
      new RegExp(validator.regex).test(value)
    );
  };

  export const iconMap = {
    username: "User",
    email: "Envelope",
    password: "Lock",
    login_identifier: "User",
    activation_code: "Key",
    reset_code: "Key",
    password_on: "Eye",
    password_off: "EyeSlash",
    error_icon: "ExclamationCircle",
    pill_valid: "Check",
    pill_invalid: "Times",
    new_password: "Lock",
    send_message: "Message",
    edit_message: "Message"
  }
