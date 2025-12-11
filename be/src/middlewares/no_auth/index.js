import { services } from "../../services/index.js";

export const noAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }
    
    const token = authHeader.split(" ")[1];
    
    const payload = await services?.json_web_token?.verify({
      token,
      type: "access",
    });
    
    if (payload) {
      return res.status(403).json({
        error: true,
        status: 403,
        message: "This route cannot be accessed with a valid token",
        noAuth: true,
      });
    }
    
    next();
  } catch (err) {
    console.error("No-auth middleware error:", err);
    next();
  }
};