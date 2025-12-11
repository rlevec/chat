
const errorHandler = (error) => {
    return {
      success: false,
      message: error.message || "An unknown error occurred",
      code: error.code || "UNKNOWN_ERROR",
    };
  };
  

  export const errorMiddleware = (error, req, res, next) => {
    try {
      const status = error.status || 400;
      const response = errorHandler(error);
  
      res.status(status).json(response);
    } catch (err) {
      const fallbackResponse = errorHandler({
        name: "FallbackError",
        message: "Unexpected error",
      });
      res.status(500).json(fallbackResponse);
    }
  };
  
  