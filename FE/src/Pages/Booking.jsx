import { useEffect, useState } from "react";

export default function Booking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/booking`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("UNAUTHORIZED");
        }
        return res.json();
      })
      .then((data) => setBookings(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        setBookings(null);
      });
  }, []);
  if (bookings === null) {
    return (
      <div className="py-10 text-center">
        <h1 className="text-3xl font-bold text-orange-600">Booking Page</h1>

        <p className="mt-4 text-lg text-gray-600">
          Bạn cần đăng nhập để xem danh sách booking.
        </p>

        <button
          onClick={() => (window.location.href = "/login")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Đăng nhập
        </button>
      </div>
    );
  }
  return (
    <div className="py-10 text-center">
      <h1 className="text-3xl font-bold text-red-600">Booking Page</h1>

      <div className="max-w-4xl mx-auto mt-10 text-left">
        <h2 className="text-xl font-semibold mb-4">Danh sách Booking</h2>

        {bookings.length === 0 && (
          <p className="text-gray-500">Không có booking nào.</p>
        )}

        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="p-4 bg-gray-100 rounded shadow">
              <p>
                <strong>Booking ID:</strong> {b.id}
              </p>
              <p>
                <strong>Status:</strong> {b.status}
              </p>

              {/* USER */}
              {b.User && (
                <p>
                  <strong>Khách hàng:</strong> {b.User.username} ({b.User.email}
                  )
                </p>
              )}

              {/* TRIP */}
              {b.Trip && (
                <p>
                  <strong>Chuyến đi:</strong> {b.Trip.description} –{" "}
                  {b.Trip.price} VND
                  <p>
                    Ngày đi: {new Date(b.Trip.start_date).toLocaleDateString()}
                  </p>
                  <p>
                    Ngày về: {new Date(b.Trip.end_date).toLocaleDateString()}
                  </p>
                </p>
              )}

              {/* PAYMENT */}
              {b.Payments && b.Payments.length > 0 && (
                <p>
                  <strong>Thanh toán:</strong> {b.Payments[0].amount} –{" "}
                  {b.Payments[0].status}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
