import { routes } from "../../../routes";

const isFormValid = (params = {}) => {
  const { fields = [], query = null, fieldError = null } = params;

  if (fields?.length > 0 && query && fieldError) {
    for (const field of fields) {
      const fieldSlug = field?.frontendSlug;
      const fieldValue = query?.[fieldSlug];
      const fieldInError = fieldError?.[fieldSlug];
      const fieldEmpty = !Boolean(fieldValue);

      if (fieldEmpty || fieldInError) return false;
    }
    return true;
  } else {
    return false;
  }
};

export const buttonDisabled = (params = {}) => {
  const formValid = isFormValid({
    fields: params?.fields,
    query: params?.query,
    fieldError: params?.fieldError,
  });

  return !formValid || !!params?.response;
};

export const submit = async (params = {}) => {
  const {
    fields = [],
    query = null,
    fieldError = null,
    event = undefined,
    token = undefined,
    isFormData = false,
    component = "",
    submitFormPostRequest = () => null,
  } = params;

  const url = routes?.server?.[component ?? ""];

  event && event.preventDefault();

  if (fields?.length > 0 && query && fieldError) {
    const formValid = isFormValid({ fields, query, fieldError });
    if (!formValid) return;

    const payload = { ...query };
    if (token) {
      payload.token = token;
    }

    if (isFormData) {
      const formData = new FormData();

      if (Array.isArray(fields) && fields.length > 0) {
        // first handle file fields
        for (const field of fields) {
          if (
            field?.inputType === "file" &&
            query?.[field?.frontendSlug] instanceof File
          ) {
            formData.append(field.frontendSlug, query[field.frontendSlug]);
          }
        }

        for (const field of fields) {
          if (
            field?.inputType !== "file" &&
            query?.[field?.frontendSlug] !== undefined
          ) {
            formData.append(field.frontendSlug, query[field.frontendSlug]);
          }
        }
      }

      if (token) {
        formData.append("token", token);
      }

      await submitFormPostRequest({ url, body: formData, options: {isAuth: component === "upload_profile_picture"} });

      return;
    }

    await submitFormPostRequest({
      url,
      body: payload,
      options: {
        isLogin: component === "login",
        isAuth: [
          "change_username",
          "change_email",
          "change_password",
        ]?.includes(component),
      },
    });
  }

  return;
};

export const handleChange = (params = {}) => {
  const {
    event = undefined,
    field: {
      frontendSlug = undefined,
      validator = null,
      required = false,
      maxLength = undefined,
    } = {},
    setQuery = () => null,
    setFieldError = () => null,
  } = params;

  if (!event || !frontendSlug) {
    console.error("Missing required parameters: event or frontendSlug");
    return;
  }

  const value = event.target.value;

  if (maxLength && value?.length > maxLength) return null;

  let isValid = true;

  if (validator && required) {
    try {
      const regex = new RegExp(validator);
      isValid = regex.test(value);
    } catch (error) {
      console.error("Invalid regex pattern:", validator);
      isValid = true;
    }
  }

  setQuery((prev) => ({
    ...prev,
    [frontendSlug]: value,
  }));

  setFieldError((prev) => ({
    ...prev,
    [frontendSlug]: !isValid,
  }));
};

export const handleSelect = (params) => {
  const {
    value = undefined,
    field: { frontendSlug = undefined } = {},
    setQuery = () => null,
    setFieldError = () => null,
  } = params;

  if (!value || !frontendSlug) {
    return;
  }

  setQuery((prev) => ({
    ...prev,
    [frontendSlug]: value,
  }));

  setFieldError((prev) => ({
    ...prev,
    [frontendSlug]: !(value && value !== ""),
  }));
};

export const handleCheck = (params) => {
  const {
    event = undefined,
    field: { frontendSlug = undefined, required = false } = {},
    setQuery = () => null,
    setFieldError = () => null,
  } = params;

  const checked = event.target.checked;

  setQuery((prev) => ({
    ...prev,
    [frontendSlug]: checked,
  }));

  setFieldError((prev) => ({
    ...prev,
    [frontendSlug]: required ? !checked : false,
  }));
};

export const handleFileUpload = (params) => {
  const {
    file = undefined,
    field: { frontendSlug = undefined } = {},
    setQuery = () => null,
    setFieldError = () => null,
  } = params;

  if (file && frontendSlug) {
    setQuery((prev) => ({
      ...prev,
      [frontendSlug]: file,
    }));
    setFieldError((prev) => ({
      ...prev,
      [frontendSlug]: false,
    }));
  }
};

export const handleFileDelete = (params) => {
  const {
    field: { frontendSlug = undefined } = {},
    setFieldError = () => null,
    setQuery = () => null,
  } = params;

  if (frontendSlug) {
    setQuery((prev) => ({
      ...prev,
      [frontendSlug]: null,
    }));
    setFieldError((prev) => ({
      ...prev,
      [frontendSlug]: false,
    }));
  }
};
