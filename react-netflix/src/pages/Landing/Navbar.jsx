import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { languageStorageAtom } from "@/jotai/atoms";
import DefaultButton from "@modules/LandingPage/DefaultButton";
import OptionLanguage from "@modules/LandingPage/OptionLanguage";

function Navbar() {
  const [languageStorage] = useAtom(languageStorageAtom);
  const navigate = useNavigate();

  return (
    <header className="absolute w-full z-20">
      <nav className="flex flex-wrap justify-between items-center pt-5 px-5 lg:pl-36 lg:pr-[160px]">
        <div>
          <img
            src="/netflix-logo-icon.png"
            alt="Logo Netflix"
            className="w-32 lg:w-[175px] lg:h-[90px]"
          />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <OptionLanguage />
          <DefaultButton
            onClick={() => navigate("/login")}
            text={languageStorage === "en" ? "Sign In" : "Masuk"}
          />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
