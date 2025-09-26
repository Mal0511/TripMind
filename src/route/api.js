import express from "express";
import TripController from "../controllers/TripController";
import UserController from "../controllers/UserController";
let router = express.Router();

let initApiRoutes = (app) => {
    router.get("/trip", TripController.getAllTrips);
    router.get("/trip/:id", TripController.getTripById);
    router.post("/trip", TripController.createTrip);
    router.get("/user", UserController.getUser);
    return app.use("/api", router);
};

export default initApiRoutes;
