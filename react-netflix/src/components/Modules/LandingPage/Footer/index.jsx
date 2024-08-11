import React from "react";
import { useAtom } from "jotai";

import EachUtils from "@/utils/EachUtils";
import { languageStorageAtom } from "@/jotai/atoms";
import OptionLanguage from "@modules/LandingPage/OptionLanguage";
import { LIST_FOOTER_EN, LIST_FOOTER_ID } from "@/constants/listFooter";

const Footer = ({ style }) => {
  const [languageStorage] = useAtom(languageStorageAtom);

  return (
    <footer
      className={`w-full text-white/80 bg-black border-t-8 border-stone-900 px-32 ${
        style ? style : "py-16"
      }`}
    >
      <div>
        {languageStorage === "en"
          ? "Question? Call"
          : "Ada Pertanyaan? Hubungi"}{" "}
        <a href="" className="underline">
          007-803-321-2130
        </a>
      </div>
      <ul className="grid sm:grid-cols-4 gap-4 py-8">
        <EachUtils
          of={languageStorage === "en" ? LIST_FOOTER_EN : LIST_FOOTER_ID}
          render={(item, index) => (
            <li key={index}>
              <a href={item.url} className="underline">
                {item.title}
              </a>
            </li>
          )}
        />
      </ul>
      <OptionLanguage />
      <p className="mt-4">Netflix Indonesia</p>
    </footer>
  );
};

export default Footer;
