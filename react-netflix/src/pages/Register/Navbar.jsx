import React from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { languageStorageAtom } from "@/jotai/atoms";

const Navbar = () => {
  const [languageStorage] = useAtom(languageStorageAtom);
  const navigate = useNavigate();

  return (
    <header className="absolute w-full px-5 z-20 border-b-2 border-b-slate-200">
      <nav className="flex justify-between items-center">
        <div>
          <img
            src="/netflix-logo-icon.png"
            alt="Logo Netflix"
            onClick={() => navigate("/")}
            className="w-[175px] h-[90px] cursor-pointer"
          />
        </div>
        <div>
          <a
            href="/login"
            className="text-2xl text-black font-semibold hover:underline"
          >
            {languageStorage === "en" ? "Sign In" : "Masuk"}
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
