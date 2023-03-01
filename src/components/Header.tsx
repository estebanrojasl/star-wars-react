import React from "react";
import { Link } from "react-router-dom";

import { useIsLoggedIn } from "./utils";

import StarwarsLogo from "../assets/starwars-logo.png";
import AvatarIcon from "../assets/icons/avatar.png";

const Header = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  const isLogged = useIsLoggedIn();

  return (
    <header className="p-4 lg:px-16">
      <div className="h-16 flex justify-between items-center">
        <Link to="/">
          <img src={StarwarsLogo} alt="logo" className="h-16" />
        </Link>
        <button
          className="flex flex-row items-center justify-between"
          onClick={() => setShowMenu(!showMenu)}
        >
          {isLogged !== true ? (
            <Link
              to="/login"
              style={{ fontFamily: "'Orbitron', sans-serif", color: "#FFE81F" }}
            >
              Login
            </Link>
          ) : (
            <img src={AvatarIcon} alt="avatar" className="rounded-full h-12" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
