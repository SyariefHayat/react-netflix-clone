import React from "react";
import { useAtom } from "jotai";

import {
  LIST_JUMBOTRON_EN,
  LIST_JUMBOTRON_ID,
} from "@/constants/listJumbotron";
import EachUtils from "@/utils/EachUtils";
import Overlay from "@modules/Element/Overlay";
import { languageStorageAtom } from "@/jotai/atoms";
import { JUMBOTRON_IMAGE } from "@/constants/listAsset";
import InputMembership from "@modules/LandingPage/InputMembership";

const Jumbotron = () => {
  const [languageStorage] = useAtom(languageStorageAtom);

  return (
    <div className="relative w-full h-[700px]">
      <Overlay
        position={"top-0"}
        size={"w-full h-[200px]"}
        color={"bg-gradient-to-b from-black to-transparent"}
      />
      <img
        src={JUMBOTRON_IMAGE}
        alt="netflix-bg"
        className="absolute object-cover w-full h-full z-[5]"
      />
      <EachUtils
        of={languageStorage === "en" ? LIST_JUMBOTRON_EN : LIST_JUMBOTRON_ID}
        render={(item, index) => (
          <div
            key={index}
            className="absolute w-full flex flex-col justify-center items-center mt-[265px] gap-4 text-center px-4 z-20"
          >
            <h1 className="font-black text-white text-5xl leading-snug">
              {item.title}
            </h1>
            <p className="text-white text-2xl mb-3">{item.desc}</p>
            <InputMembership instanceId={1} />
          </div>
        )}
      />
      <Overlay
        size={"w-full h-full"}
        color={"bg-[#00000080]"}
        position={"top-0 left-0"}
      />
      <Overlay
        size={"w-full h-[300px]"}
        color={"bg-gradient-to-t from-black to-transparent"}
        position={"bottom-0"}
      />
    </div>
  );
};

export default Jumbotron;
