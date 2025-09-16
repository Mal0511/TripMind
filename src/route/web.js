import express from "express";
import homeControler from "../controllers/homeController";
import LoginController from "../controllers/LoginController";

let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", LoginController.getLoginPage);
    router.post("/auth/login", LoginController.getLoginController);
    router.post("/auth/register", LoginController.getRegisterController);
    router.get("/main_screen", homeControler.getHomePage);
    return app.use("/", router);
}
module.exports = initWebRoutes;