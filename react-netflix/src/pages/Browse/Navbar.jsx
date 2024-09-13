import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";

import EachUtils from "@/utils/EachUtils";
import { LIST_NAVBAR } from "@/constants/listNavbar";
import AccountMenu from "@modules/BrowsePage/AccountMenu";
import useScrollPosition from "@/hooks/useScrollPosition";
import InputSearchMovies from "@modules/BrowsePage/InputSearchMovies";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isScrolled = useScrollPosition();
  const navigate = useNavigate();

  return (
    <header className="relative">
      <nav
        className={`${
          isScrolled ? "bg-[#141414]" : "bg-transparent"
        } fixed text-white top-0 left-0 px-2 md:px-4 py-2 w-full transition-all duration-300 z-30`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center md:gap-4">
            <div className="md:hidden">
              {isOpen ? (
                <>
                  <MdClose
                    size={40}
                    onClick={() => setIsOpen((prev) => !prev)}
                  />
                  <div className="absolute top-16 left-0">
                    <ul className="menu rounded-box w-56 flex flex-col justify-center items-center bg-[#141414]">
                      <InputSearchMovies />
                      <EachUtils
                        of={LIST_NAVBAR}
                        render={(item, index) => (
                          <li key={index} className="text-xl py-3">
                            <a href={item.url}>{item.title}</a>
                          </li>
                        )}
                      />
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <MdMenu
                    size={40}
                    onClick={() => setIsOpen((prev) => !prev)}
                  />
                </>
              )}
            </div>
            <img
              src="/netflix-logo-icon.png"
              alt="logo netflix"
              className="w-[120px] cursor-pointer hover:scale-105 transition-all"
              onClick={() => navigate("/browse")}
            />
            <ul className="md:flex hidden items-center gap-4">
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
          <div className="hidden sm:flex items-center gap-4">
            <InputSearchMovies />
            <AccountMenu />
          </div>
          <div className="flex sm:hidden items-center pr-2">
            <AccountMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
