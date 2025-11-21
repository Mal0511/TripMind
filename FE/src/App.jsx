import { Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Plan from "./Pages/Plan";
import PlaceWeather from "./Pages/PlaceWeather";
import Booking from "./Pages/Booking";
import User from "./Pages/User";
import Setting from "./Pages/Setting";
import NotFound from "./Pages/NotFound"; 
import './index.css'

function App() {
  return (
      <div className="min-h-screen">
        <Header></Header>
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/place-weather" element={<PlaceWeather />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/user" element={<User />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer></Footer>
      </div>
  );
}

export default App;
