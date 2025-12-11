import { services } from "../../services/index.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: true, status: 401, message: "Access token missing" });
    }

    const token = authHeader.split(" ")[1];

    const payload = await services?.json_web_token?.verify({
      token,
      type: "access",
    });


    if (!payload) {
      return res.status(401).json({ error: true, status: 401, auth: true, message: "Invalid or expired access token" });
    }

    req.user = payload;

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ error: true, status: 401, message: "Invalid or expired access token" });
  }
};
