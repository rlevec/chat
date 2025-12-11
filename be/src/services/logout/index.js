import { utils } from "../../utils/index.js";

import { services } from "../index.js";

export const logout = async ({ req, res }) => {

  try {

    const user = req.user;

    const userId = user?.id;

    if (!userId) return utils.throw_new_error(401, "Unauthorized");

    const deleted = await services.json_web_token.delete({
      redisKey: `${userId}_refreshToken`,
    });
    
    if (!deleted) {
      console.warn(`No refresh token found for user ${userId} during logout`);
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return {
      success: true,
      status: 200,
      message: "Logged out successfully",
    };
  } catch (error) {
    return utils.throw_new_error(500, "Logout failed");
  }
};
