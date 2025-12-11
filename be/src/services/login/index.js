import { utils } from "../../utils/index.js";

import { services } from "../index.js";

import { db } from "../../db/index.js";

export const login = async ({res, req, client}) => {
  const body = req.body;

  if (!body) return utils?.throw_new_error(400, "Request body is missing!");

  const loginIdentifier = body?.login_identifier;
  const password = body?.password;
  
  if (!loginIdentifier) return utils?.throw_new_error(400, "Login identifier is required!");
  if (!password) return utils?.throw_new_error(400, "Password is required!");
  
  const user = await db?.psql?.queries?.user?.select_user_by_email_or_username({client, identifier: loginIdentifier})

  if (!user) return utils?.throw_new_error(401, "Invalid credentials");

  if(!user?.activated) return utils?.throw_new_error(401, "Please check your email for account activation.");

  const hashedPassword = user.password;
  const id = user?.id;
  const username = user?.username
  const verifiedPassword = await services?.verify_password({
    password,
    hashedPassword
  })

  if (!verifiedPassword) return utils?.throw_new_error(401, "Invalid credentials");

  const payload = {
    id: String(id),
    username: String(username)
  };

  const accessToken = await services?.json_web_token?.sign({ payload, type: "access" });
  const refreshToken = await services?.json_web_token?.sign({ payload, type: "refresh", redisKey: `${id}_refreshToken` });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return {
    success: true,
    status: 200,
    isLogin: true,
    message: "Logged in successfully",
    userId: user?.id,
    accessToken
  };
};