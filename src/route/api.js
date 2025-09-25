import express from "express";
import TripController from "../controllers/TripController";

let router = express.Router();

let initApiRoutes = (app) => {
    router.get("/trip", TripController.getAllTrips);
    router.get("/trip/:id", TripController.getTripById);
    router.post("/trip", TripController.createTrip);

    return app.use("/api", router);
};

export default initApiRoutes;
