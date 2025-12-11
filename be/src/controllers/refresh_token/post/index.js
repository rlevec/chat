import {services} from "../../../services/index.js"

export const post = async (
    req,
    res,
    next
  ) => {
  
    try {

      const response = await services?.json_web_token?.refresh({req, res})

      res.status(200).json(response);
      return;
    } catch (error) {
      console.error("Error handling refresh token POST request:", error);
      next(error);
    }
  };