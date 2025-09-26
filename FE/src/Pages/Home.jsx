import DestinationCard from "../Components/DestinationCard";
import { apiFetch } from "../config/api";
import { useEffect, useState } from "react";

const Home = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    apiFetch("/api/trip") // API backend
      .then((data) => setDestinations(data.slice(0, 3)))
      .catch((err) => {
        console.error(err);
         window.location.href = import.meta.env.VITE_FE_URL + "/";
      });
  }, []);

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
};

export default Home;
