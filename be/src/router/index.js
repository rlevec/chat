import { Router } from "express";


import { controllers } from "../controllers/index.js";

import { middlewares } from "../middlewares/index.js";


export const router = ({ app, io }) => {
  const apiRouter = Router();

  apiRouter.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
  });


  apiRouter.get("/login", middlewares?.no_auth, (req, res, next) =>
    controllers?.login?.get(req, res, next)
  );
  apiRouter.get("/register", middlewares?.no_auth, (req, res, next) =>
    controllers?.register?.get(req, res, next)
  );
  apiRouter.get("/forgot_password", middlewares?.no_auth, (req, res, next) =>
    controllers?.forgot_password?.get(req, res, next)
  );
  apiRouter.get("/reset_password", middlewares?.no_auth, (req, res, next) =>
    controllers?.reset_password?.get(req, res, next)
  );
  apiRouter.get("/account_activation", middlewares?.no_auth, (req, res, next) =>
    controllers?.account_activation?.get(req, res, next)
  );
  apiRouter.get("/resend_activation", middlewares?.no_auth, (req, res, next) =>
    controllers?.resend_activation?.get(req, res, next)
  );

  apiRouter.post("/register", middlewares?.no_auth, (req, res, next) =>
    controllers?.register?.post(req, res, next)
  );
  apiRouter.post(
    "/account_activation",
    middlewares?.no_auth,
    (req, res, next) => controllers?.account_activation.post(req, res, next)
  );
  apiRouter.post("/forgot_password", middlewares?.no_auth, (req, res, next) =>
    controllers?.forgot_password?.post(req, res, next)
  );
  apiRouter.post("/reset_password", middlewares?.no_auth, (req, res, next) =>
    controllers?.reset_password?.post(req, res, next)
  );
  apiRouter.post("/login", middlewares?.no_auth, (req, res, next) =>
    controllers?.login?.post(req, res, next)
  );
  apiRouter.post("/resend_activation", middlewares?.no_auth, (req, res, next) =>
    controllers.resend_activation?.post(req, res, next)
  );

  apiRouter.post("/refresh_token", (req, res, next) =>
    controllers.refresh_token?.post(req, res, next)
  );

  apiRouter.post("/logout", middlewares?.auth, (req, res, next) =>
    controllers.logout?.post(req, res, next)
  );

  apiRouter.get("/chat", middlewares?.auth, (req, res, next) =>
    controllers.chat?.get(req, res, next)
  );

  apiRouter.post("/send_contact_request", middlewares?.auth, (req, res, next) =>
    controllers?.send_contact_request?.post(req, res, next, io)
  );

  apiRouter.post(
    "/decline_contact_request",
    middlewares?.auth,
    (req, res, next) =>
      controllers?.decline_contact_request?.post(req, res, next, io)
  );

  apiRouter.post(
    "/accept_contact_request",
    middlewares?.auth,
    (req, res, next) =>
      controllers?.accept_contact_request?.post(req, res, next, io)
  );

  apiRouter.post("/block_contact", middlewares?.auth, (req, res, next) =>
    controllers?.block_contact?.post(req, res, next, io)
  );

  apiRouter.post("/unblock_contact", middlewares?.auth, (req, res, next) =>
    controllers?.unblock_contact?.post(req, res, next, io)
  );

  apiRouter.post("/remove_contact", middlewares?.auth, (req, res, next) =>
    controllers?.remove_contact?.post(req, res, next, io)
  );

  apiRouter.get("/contact_list", middlewares?.auth, (req, res, next) =>
    controllers?.contact_list?.get(req, res, next)
  );

  apiRouter.get("/upload_profile_picture", middlewares?.auth, (req, res, next) =>
    controllers.upload_profile_picture?.get(req, res, next)
  );


  apiRouter.post("/upload_profile_picture", middlewares?.auth, (req, res, next) => controllers?.upload_profile_picture?.post(req, res, next, io));
  
  apiRouter.get("/profile_picture/:id", (req, res, next) => controllers?.profile_picture?.get(req, res, next));

  apiRouter.get("/user", middlewares?.auth, (req, res, next) => controllers?.user?.get(req, res, next));

  apiRouter.get("/change_username", middlewares?.auth, (req, res, next) => controllers?.change_username?.get(req, res, next));

  apiRouter.post("/change_username", middlewares?.auth, (req, res, next) => controllers?.change_username?.post(req, res, next, io));

  apiRouter.get("/change_email", middlewares?.auth, (req, res, next) => controllers?.change_email?.get(req, res, next));

  apiRouter.post("/change_email", middlewares?.auth, (req, res, next) => controllers?.change_email?.post(req, res, next));

  apiRouter.get("/change_password", middlewares?.auth, (req, res, next) => controllers?.change_password?.get(req, res, next));

  apiRouter.post("/change_password", middlewares?.auth, (req, res, next) => controllers?.change_password?.post(req, res, next));

  apiRouter.post("/send_message", middlewares?.auth, (req, res, next) => controllers?.send_message?.post(req, res, next, io));

  apiRouter.post("/delete_message", middlewares?.auth, (req, res, next) => controllers?.delete_message?.post(req, res, next, io));

  apiRouter.post("/edit_message", middlewares?.auth, (req, res, next) => controllers?.edit_message?.post(req, res, next, io));

  apiRouter.get("/message_list/:id", middlewares?.auth, (req, res, next) => controllers?.message_list?.get(req, res, next, io));
  
  app.use("/api", apiRouter);

  app.use((req, res) => {
    res.status(404).json({ error: true, message: "Route Not Found" });
  });
};
