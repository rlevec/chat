class CustomError extends Error {
    constructor(status, message, extra = {}) {
      super(message);
      this.name = "CustomError";
  
      this.data = {
        status,
        message,
        ...extra,
      };
  
      Object.setPrototypeOf(this, new.target.prototype);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }
    }
  }
  
  export const throwNewError = (status, message, extra = {}) => {
    throw new CustomError(status, message, extra);
  };
  
  