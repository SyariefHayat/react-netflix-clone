import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="absolute w-full z-20">
      <nav className="pl-36">
        <div>
          <img
            src="/netflix-logo-icon.png"
            alt="Logo Netflix"
            onClick={() => navigate("/")}
            className="w-[175px] h-[90px] cursor-pointer"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
