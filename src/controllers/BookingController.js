import { model } from 'mongoose';
import db from '../models/index';

const Booking = db.Booking;
const Trip = db.Trip;
const User = db.User;

let getBookingPage = (req, res) => {
    return res.render('Booking');
}

let getallBooking = async (req, res) => {
    try {
        const booking = await Booking.findAll({
            include : [
                {
                    model : Trip, attributes: [
                        "id", 
                        "title", 
                        "destination", 
                        "start_location", 
                        "end_location",
                        "start_date",
                        "end_date", 
                        "price",
                        "createdAt",
                        "updatedAt"
                    ],
                    model : User, attributes: [

                    ]
                }
            ]
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message : error.message});
    }
}

module.exports = {
    getBookingPage : getBookingPage,
}