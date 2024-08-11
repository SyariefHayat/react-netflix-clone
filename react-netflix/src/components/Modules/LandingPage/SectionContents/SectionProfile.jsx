import React from "react";
import { useAtom } from "jotai";

import EachUtils from "@/utils/EachUtils";
import SectionLayout from "@layouts/SectionLayout";
import { languageStorageAtom } from "@/jotai/atoms";
import { PROFILE_KIDS_IMAGE } from "@/constants/listAsset";
import { LIST_CONTENT_4_EN, LIST_CONTENT_4_ID } from "@/constants/listContent";

const SectionProfile = () => {
  const [languageStorage] = useAtom(languageStorageAtom);

  return (
    <SectionLayout>
      <div>
        <img src={PROFILE_KIDS_IMAGE} alt="kids-image" />
      </div>
      <EachUtils
        of={languageStorage === "en" ? LIST_CONTENT_4_EN : LIST_CONTENT_4_ID}
        render={(item, index) => (
          <div key={index} className="px-8">
            <h2 className="font-black text-5xl">{item.title}</h2>
            <p className="text-2xl mt-4">{item.desc}</p>
          </div>
        )}
      />
    </SectionLayout>
  );
};

export default SectionProfile;
