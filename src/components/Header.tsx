import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useIsLoggedIn } from "./utils";

import StarwarsLogo from "../assets/starwars-logo.png";
import AvatarIcon from "../assets/icons/avatar.png";

const Header = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const wrapperRef = useRef(null);

  const navigate = useNavigate();
  const isLogged = useIsLoggedIn();

  return (
    <header className="p-4 px-16 relative bg-black z-10">
      <div className="h-16 flex justify-between items-center">
        <Link to="/">
          <img src={StarwarsLogo} alt="logo" className="h-16" />
        </Link>

        <div className="flex items-center">
          <Link to="/films">Films</Link>
          <div className="p-2" />
          <Link to="/characters">Characters</Link>
          <div className="p-2" />
          <Link to="/characters">Vehicles</Link>

          <div className="p-6" />
          {isLogged !== "true" ? (
            <Link
              to="/login"
              style={{ fontFamily: "'Orbitron', sans-serif", color: "#FFE81F" }}
            >
              Login
            </Link>
          ) : (
            <button
              ref={wrapperRef}
              className="flex flex-row items-center justify-between"
              onClick={() => setShowMenu(!showMenu)}
            >
              <img
                src={AvatarIcon}
                alt="avatar"
                className="rounded-full h-12"
              />{" "}
            </button>
          )}
        </div>
      </div>

      {showMenu === true ? (
        <div className="absolute right-14 top-18">
          <ul className="space-y-2">
            <li>
              <button
                className="flex items-center p-2 text-base font-normal text- rounded-lg text-white bg-gray-700 hover:bg-gray-500"
                onClick={() => {
                  setShowMenu(!showMenu);
                  navigate("/logout", { replace: true });
                }}
              >
                <span className="mr-6">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
