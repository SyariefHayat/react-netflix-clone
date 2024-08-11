import React, { useState } from "react";
import { useAtom } from "jotai";
import { motion } from "framer-motion";

import {
  FAQ_TITLE_EN,
  FAQ_TITLE_ID,
  LIST_FAQ_EN,
  LIST_FAQ_ID,
} from "@/constants/listFAQ";
import EachUtils from "@/utils/EachUtils";
import { languageStorageAtom } from "@/jotai/atoms";
import InputMembership from "@modules/LandingPage/InputMembership";

const SectionFAQ = () => {
  const [languageStorage] = useAtom(languageStorageAtom);
  const [openContentIndex, setOpenContentIndex] = useState(null);

  return (
    <div className="w-full p-16 bg-black border-t-8 border-t-stone-900">
      <h2 className="text-5xl mb-2 font-black text-white text-center">
        {languageStorage === "en" ? FAQ_TITLE_EN : FAQ_TITLE_ID}
      </h2>
      <ul className="w-5/6 mx-auto flex flex-col gap-2 py-8">
        <EachUtils
          of={languageStorage === "en" ? LIST_FAQ_EN : LIST_FAQ_ID}
          render={(item, index) => (
            <li key={index}>
              <div className="bg-[#2d2d2d] hover:bg-[#414141] text-white">
                <button
                  className="flex p-6 justify-between items-center w-full"
                  onClick={() =>
                    setOpenContentIndex(
                      openContentIndex == index ? null : index
                    )
                  }
                >
                  <span className="font-semibold text-2xl">{item.title}</span>
                  <motion.div
                    animate={{ rotate: openContentIndex == index ? 135 : 0 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      role="img"
                      aria-hidden="true"
                      className="elj7tfr3 default-ltr-cache-1dpnjn e164gv2o4"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </motion.div>
                </button>
              </div>
              <motion.div
                initial={{ translateY: -10 }}
                animate={{ translateY: openContentIndex == index ? 0 : -10 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: openContentIndex == index ? "block" : "none",
                }}
                className="px-6 pt-4 pb-[1px] text-left text-white bg-[#2d2d2d] mt-[1px]"
              >
                {item.desc.split("\n").map((item, index) => (
                  <p key={index} className="text-2xl mb-8">
                    {item}
                  </p>
                ))}
              </motion.div>
            </li>
          )}
        />
      </ul>
      <div className="max-w-5xl mx-auto mt-4 text-center">
        <div
          className={`${
            languageStorage === "en" ? "w-[65%]" : "w-[78%]"
          } mx-auto`}
        >
          <InputMembership />
        </div>
      </div>
    </div>
  );
};

export default SectionFAQ;
