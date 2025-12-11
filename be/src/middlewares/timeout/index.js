import { utils } from "../../utils/index.js";

export const requestTimeout =
  (time) => (req, res, next) => {
    res.setTimeout(time, () => {
      if (!res.headersSent) {
        utils?.throw_new_error(408, "Request timed out");
      }
    });
    next();
  };