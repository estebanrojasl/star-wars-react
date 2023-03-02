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

const ScrollDownBounce = () => {
  return (
    <div className="animate-bounce bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-200/20 shadow-lg rounded-full">
      <svg
        className="w-6 h-6 text-slate-500"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
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
        <Crawl />
      </div>
      <div className="flex flex-col items-center max-w-2xl p-8 mx-auto text-center">
        <ScrollDownBounce />
        <div className="p-6" />

        <h1
          style={{
            fontSize: 20,
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          Welcome to our Star Wars website! May the Force be with you as you
          explore the universe of Star Wars.
        </h1>
        <div className="p-6" />
        <div className="flex gap-32">
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
        <div className="p-8" />
        <small className="p-8 text-slate-500">
          Copyright © 2023 Esteban Rojas
        </small>
      </div>
    </>
  );
};

export default Home;
