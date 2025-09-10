import express from "express";
import homeControler from "../controllers/homeController";
import LoginController from "../controllers/LoginController";
let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", homeControler.getHomePage);
    router.get("/login", LoginController.getLoginController);
    return app.use("/", router);
}
module.exports = initWebRoutes;