import React from "react";
import { useAtom } from "jotai";

import EachUtils from "@/utils/EachUtils";
import SectionLayout from "@layouts/SectionLayout";
import { languageStorageAtom } from "@/jotai/atoms";
import { LIST_CONTENT_3_EN, LIST_CONTENT_3_ID } from "@/constants/listContent";
import { WATCH_DEVICE_IMAGE, WATCH_DEVICE_VIDEO } from "@/constants/listAsset";

const SectionWatch = () => {
  const [languageStorage] = useAtom(languageStorageAtom);

  return (
    <SectionLayout>
      <EachUtils
        of={languageStorage === "en" ? LIST_CONTENT_3_EN : LIST_CONTENT_3_ID}
        render={(itemn, index) => (
          <div key={index} className="px-8">
            <h2 className="text-5xl font-bold">{itemn.title}</h2>
            <p className="text-2xl mt-4">{itemn.desc}</p>
          </div>
        )}
      />
      <div className="relative max-w-xl mx-auto">
        <img
          src={WATCH_DEVICE_IMAGE}
          alt="computer-image"
          className="relative z-10"
        />
        <div className="absolute w-[62%] top-10 left-1/2 -translate-x-1/2">
          <video autoPlay muted loop>
            <source src={WATCH_DEVICE_VIDEO} type="video/mp4" />
          </video>
        </div>
      </div>
    </SectionLayout>
  );
};

export default SectionWatch;
