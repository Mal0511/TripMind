import db from "../models/index.js";

const Trip = db.Trip;

let getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll();
    const tripsWithDays = trips.map(trip => ({
      ...trip.toJSON(),
      days: trip.getDays()
    }));
    return res.status(200).json(tripsWithDays);
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
    return res.status(200).json({
      ...trip.toJSON(),
      days: trip.getDays()
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching trip" });
  }
};

let createTrip = async (req, res) => {
  try {
    const { partnerId, title, description, image, country, city, start_date, end_date, price } = req.body;
    const newTrip = await Trip.create({
      partnerId,
      title,
      description,
      image,
      country,
      city,
      start_date,
      end_date,
      price
    });
    return res.status(201).json({
      ...newTrip.toJSON(),
      days: newTrip.getDays()
    });
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
