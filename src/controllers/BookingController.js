const db = require("../models/index");
const Booking = db.Booking;
exports.getAllBookings = async (req, res) => {
  try {
    // 1. Kiểm tra session
    const userId = req.session?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    // 2. Lấy danh sách booking của user hiện tại
    const bookings = await Booking.findAll({
      where: { userId }, // chỉ lấy booking của user này
      include: [
        { model: db.User, attributes: ["id", "username", "email"] },
        { model: db.Trip, attributes: ["id", "description", "price", "start_date", "end_date"] },
        { model: db.Payment, attributes: ["id", "amount", "status"] }
      ],
    });

    res.json(bookings);
  } catch (error) {
    console.error("Booking DB error:", error);
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};
