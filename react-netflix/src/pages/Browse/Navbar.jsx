import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EachUtils from "@/utils/EachUtils";
import { LIST_NAVBAR } from "@/constants/listNavbar";
import AccountMenu from "@modules/BrowsePage/AccountMenu";
import InputSearchMovies from "@modules/BrowsePage/InputSearchMovies";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="relative">
      <nav
        className={`${
          isScrolled ? "bg-[#141414]" : "bg-transparent"
        } fixed text-white top-0 left-0 px-8 py-2 w-full transition-all duration-300 z-30`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src="/netflix-logo-icon.png"
              alt="logo netflix"
              className="w-[120px] ml-2 cursor-pointer hover:scale-105 transition-all"
              onClick={() => navigate("/browse")}
            />
            <ul className="sm:flex hidden items-center gap-4">
              <EachUtils
                of={LIST_NAVBAR}
                render={(item, index) => (
                  <li key={index}>
                    <a href={item.url}>{item.title}</a>
                  </li>
                )}
              />
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <InputSearchMovies />
            <AccountMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
