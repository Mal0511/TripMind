import DestinationCard from "../Components/DestinationCard";
import { useEffect, useState } from "react";


export default function Home() {
  const [trips, setTrips] = useState([]);

   useEffect(() => {
    fetch("http://localhost:1150/api/trip", { credentials: "include" })
      .then(res => {
        if (res.status === 401) {
          window.location.href = "http://localhost:1150/";
        }
        return res.json();
      })
      .then(data => setTrips(data))
      .catch(err => console.error(err));
  }, []);



  const destinations = [
    {
      image: "/public/assets/P1.jpg",
      title: "Ta Xua",
      price: "$1.5k",
      days: "6 Days Trip",
    },
    {
      image: "/public/assets/P2.jpg",
      title: "Da Lat",
      price: "$1.5k",
      days: "5 Days Trip",
    },
    {
      image: "/public/assets/P3.jpg",
      title: "Phong Nha",
      price: "$1.5k",
      days: "7 Days Trip",
    },
  ];

  return (
    <section className="max-w-6xl px-6 py-12 mx-auto">
      <h1 className="mt-2 text-3xl font-bold text-center text-gray-800">
        Top Destinations
      </h1>

      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {destinations.map((dest, index) => (
          <DestinationCard
            key={index}
            image={dest.image}
            title={dest.title}
            price={dest.price}
            days={dest.days}
          />
        ))}
      </div>
    </section>
  );
}
