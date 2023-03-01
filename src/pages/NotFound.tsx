import React from "react";
import StormTrooper1 from "../assets/storm_trooper1.png";
import StormTrooper2 from "../assets/storm_trooper2.png";

const NotFound = () => (
  <div className="flex justify-center items-center">
    <img
      src={StormTrooper2}
      alt="storm-trooper"
      className="px-8"
      style={{ height: 400 }}
    />
    <div className="p-8">
      <h3 className="text-gray-500">Trooper report:</h3>
      <div className="p-4" />
      <h2 className="text-gray-100">
        This is not the page you are looking for...
      </h2>
      <h2 className="text-gray-100">Move along...</h2>
      <div className="p-8" />
      <p className="text-gray-100">404 - Not found</p>
    </div>
    <img
      src={StormTrooper1}
      alt="storm-trooper"
      className="px-8"
      style={{ height: 400 }}
    />
  </div>
);
export default NotFound;
