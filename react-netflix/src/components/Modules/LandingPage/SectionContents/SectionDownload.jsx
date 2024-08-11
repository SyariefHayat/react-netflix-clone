import React from "react";
import { useAtom } from "jotai";
import Lottie from "lottie-react";

import {
  DOWNLOAD_COVER_IMAGE,
  DOWNLOAD_PHONE_IMAGE,
} from "@/constants/listAsset";
import EachUtils from "@/utils/EachUtils";
import SectionLayout from "@layouts/SectionLayout";
import { languageStorageAtom } from "@/jotai/atoms";
import downloadAnimation from "@/assets/download-animation.json";
import { LIST_CONTENT_2_EN, LIST_CONTENT_2_ID } from "@/constants/listContent";

const SectionDownload = () => {
  const [languageStorage] = useAtom(languageStorageAtom);

  return (
    <SectionLayout>
      <div className="relative max-w-xl mx-auto">
        <img
          src={DOWNLOAD_PHONE_IMAGE}
          alt="phone-image"
          className="relative"
        />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black border border-white/50 flex justify-center items-center rounded-xl py-2 w-[60%] gap-4">
          <img
            src={DOWNLOAD_COVER_IMAGE}
            alt="cover-image"
            className="max-h-20"
          />
          <div className="flex flex-col text-left ">
            <p className="font-bold">Stranger Things</p>
            <p className="text-blue-600 font-semibold">
              {languageStorage === "en" ? "Downloading..." : "Men-donwload..."}
            </p>
          </div>
          <div className="w-16 h-16">
            <Lottie animationData={downloadAnimation} loop={true} />
          </div>
        </div>
      </div>
      <EachUtils
        of={languageStorage === "en" ? LIST_CONTENT_2_EN : LIST_CONTENT_2_ID}
        render={(item, index) => (
          <div key={index}>
            <h2 className="text-5xl font-black">{item.title}</h2>
            <p className="text-2xl mt-4">{item.desc}</p>
          </div>
        )}
      />
    </SectionLayout>
  );
};

export default SectionDownload;
