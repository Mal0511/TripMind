// src/controllers/TripController.js
import db from "../models/index.js";

const Trip = db.Trip;

let getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll();
    return res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching trips" });
  }
};

let getTripById = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    return res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching trip" });
  }
};

let createTrip = async (req, res) => {
  try {
    const { name, location, price } = req.body;
    const newTrip = await Trip.create({ name, location, price });
    return res.status(201).json(newTrip);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating trip" });
  }
};

export default {
  getAllTrips,
  getTripById,
  createTrip,
};
