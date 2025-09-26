import DestinationCard from "../Components/DestinationCard";
import { useEffect, useState } from "react";

const Home = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => { fetch("https://ninety-tigers-dig.loca.lt/api/trip") // API backend 
    .then((res) => { 
      if (res.status === 401) { 
        window.location.href = "https://ninety-tigers-dig.loca.lt/"; // redirect login 
      } return res.json(); }) 
    .then((data) => setDestinations(data.slice(0,3))) 
    .catch((err) => console.error(err)); 
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
