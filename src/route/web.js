import express from "express";

import {
  getLoginPage,
  getLoginController,
  getRegisterController,
} from "../controllers/LoginController.js";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", getLoginPage);
  router.post("/auth/login", getLoginController);
  router.post("/auth/register", getRegisterController);

  return app.use("/", router);
};

export default initWebRoutes;
