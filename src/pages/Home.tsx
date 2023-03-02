import React from "react";
import { Link } from "react-router-dom";

import FilmsIcon from "../assets/icons/swords-white-vector.svg";
import CharactersIcon from "../assets/icons/r2d2-white-vector.svg";
import VehiclesIcon from "../assets/icons/xwing-white-vector.svg";
import Space from "../assets/space-bg.jpg";

const menuItems = [
  { name: "Films", path: "/films", icon: FilmsIcon },
  { name: "Characters", path: "/characters", icon: CharactersIcon },
  { name: "Vehicles", path: "/vehicles", icon: VehiclesIcon },
];

const Crawl = () => {
  return (
    <div className="mx-auto overflow-hidden">
      <div className="fade" />

      <section className="star-wars">
        <div className="crawl">
          <div className="title">
            <p>Episode IV</p>
            <h1>A New Hope</h1>
          </div>

          <p>
            It is a period of civil war. Rebel spaceships, striking from a
            hidden base, have won their first victory against the evil Galactic
            Empire.
          </p>
          <p>
            During the battle, Rebel spies managed to steal secret plans to the
            Empire’s ultimate weapon, the DEATH STAR, an armored space station
            with enough power to destroy an entire planet.
          </p>
          <p>
            Pursued by the Empire’s sinister agents, Princess Leia races home
            aboard her starship, custodian of the stolen plans that can save her
            people and restore freedom to the galaxy…
          </p>
        </div>
      </section>
      <div className="fade-reverse" />
    </div>
  );
};

const Home = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url("${Space}")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
          maxWidth: "100%",
        }}
      >
        <Crawl />{" "}
      </div>
      <div className="max-w-2xl mx-auto text-center">
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
    </>
  );
};

export default Home;
