import React from "react";
import { Link } from "react-router-dom";

import FilmsIcon from "../assets/icons/swords-white-vector.svg";
import CharactersIcon from "../assets/icons/r2d2-white-vector.svg";
import VehiclesIcon from "../assets/icons/xwing-white-vector.svg";

const menuItems = [
  { name: "Films", path: "/films", icon: FilmsIcon },
  { name: "Characters", path: "/characters", icon: CharactersIcon },
  { name: "Vehicles", path: "/vehicles", icon: VehiclesIcon },
];

const Home = () => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2>Welcome to this starwars page</h2>
      <div className="p-8" />
      <div className="flex justify-between">
        {menuItems.map((item) => (
          <div key={item.name}>
            <Link to={item.path} className="flex flex-col items-center">
              <img src={item.icon} alt={item.name} style={{ height: 100 }} />
              <div className="p-2" />
              <h2>{item.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
