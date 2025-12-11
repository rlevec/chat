import jwt from "jsonwebtoken"

export const decode = async ({ token }) => {
    if (!token) return null;
    return jwt.decode(token);
  };
  