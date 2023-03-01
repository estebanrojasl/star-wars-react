import React, { useEffect } from "react";

import Yoda from "../assets/yoda.png";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("loggedIn");
    window.dispatchEvent(new Event("storage"));
  }, []);

  return (
    <div className="flex justify-center items-center">
      <img
        src={Yoda}
        alt="storm-trooper"
        className="px-8"
        style={{ height: 400 }}
      />
      <div className="p-8">
        <h3 className="text-gray-500">You are logged out!</h3>
        <div className="p-4" />
        <h2 className="text-gray-100">"I don’t believe it!</h2>
        <h2 className="text-gray-100">That is why you fail."</h2>
        <div className="p-8" />
        <p className="text-gray-100">See ya!</p>
      </div>
    </div>
  );
};
export default Logout;
