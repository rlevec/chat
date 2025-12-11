import { services } from "../../index.js";
import { utils } from "../../../utils/index.js";
import { db } from "../../../db/index.js";

export const refresh = async ({ req, res }) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return utils?.throw_new_error(401, "Refresh token missing");
    }

    const payload = await services?.json_web_token.verify({ token: refreshToken, type: "refresh" });

    if (!payload?.id) {
      return utils?.throw_new_error(401, "Invalid refresh token");
    }

    const userId = String(payload.id);
    const refreshTokenRedisKey = `${userId}_refreshToken`;

    const { exp, iat, ...cleanPayload } = payload;


    const storedToken = await db?.redis?.utils?.get({key: refreshTokenRedisKey});
     if (storedToken !== refreshToken) return utils?.throw_new_error(401, "Refresh token revoked");

    const [newAccessToken, newRefreshToken] = await Promise.all([
      services?.json_web_token.sign({ payload: cleanPayload, type: "access" }),
      services?.json_web_token.sign({ payload: cleanPayload, type: "refresh", redisKey: refreshTokenRedisKey }),
    ]);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken: newAccessToken,
      userId: userId,
      message: "Tokens refreshed successfully",
      success: true,
      status: 200,
    };
  } catch (err) {
    console.error("Refresh token error:", err);
    return utils?.throw_new_error(401, "Token refresh failed");
  }
};
