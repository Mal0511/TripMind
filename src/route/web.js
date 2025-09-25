import express from "express";
import homeControler from "../controllers/homeController";
import LoginController from "../controllers/LoginController";
import getAllTrips from "../controllers/TripController";


let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", LoginController.getLoginPage);
    router.post("/auth/login", LoginController.getLoginController);
    router.post("/auth/register", LoginController.getRegisterController);
    return app.use("/", router);
}
module.exports = initWebRoutes;