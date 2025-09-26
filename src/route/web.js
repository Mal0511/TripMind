import express from "express";
import LoginController from "../controllers/LoginController";



let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", LoginController.getLoginPage);
    router.post("/auth/login", LoginController.getLoginController);
    router.post("/auth/register", LoginController.getRegisterController);
    return app.use("/", router);
}
module.exports = initWebRoutes;