import React from "react";
import { useAtom } from "jotai";
import { IoIosCloseCircleOutline } from "react-icons/io";

import EachUtils from "@/utils/EachUtils";
import useEmailValidation from "@/hooks/useEmailValidation";
import { emailAtom, languageStorageAtom } from "@/jotai/atoms";
import { LIST_CTA_EN, LIST_CTA_ID } from "@/constants/listCTA";
import DefaultButton from "@modules/LandingPage/DefaultButton";

const InputMembership = () => {
  const { emailMessage, validateEmail, handleEmail } = useEmailValidation();

  const [email] = useAtom(emailAtom);
  const [languageStorage] = useAtom(languageStorageAtom);

  return (
    <form action="">
      <EachUtils
        of={languageStorage === "en" ? LIST_CTA_EN : LIST_CTA_ID}
        render={(item, index) => (
          <div key={index}>
            <h3 className="text-[1.3rem] text-white">{item.title}</h3>
            <div className="relative flex justify-center items-center gap-2 py-4">
              <input
                type="email"
                value={email ? email : ""}
                placeholder={item.labelInput}
                onChange={(e) => validateEmail(e.target.value)}
                className={`w-[55%] text-white pl-4 pt-5 pr-4 pb-3 bg-dark/50 rounded-md border peer placeholder-transparent focus:outline outline-2 outline-offset-2 outline-white ${
                  emailMessage ? "border-red-600" : "border-white/50"
                }`}
              />
              <label
                className={`absolute top-0 left-0 ${
                  languageStorage === "en" ? "pl-[60px]" : "pl-[120px]"
                } peer-placeholder-shown:top-[30px] peer-focus:top-5 top-5 peer-focus:text-sm transition-all ${
                  email ? "text-sm" : "text-lg"
                }`}
              >
                {item.labelInput}
              </label>
              <DefaultButton
                isArrowIcon={true}
                text={item.buttonSubmit}
                onClick={(e) => handleEmail(e, "/register")}
                styles={`flex ${
                  languageStorage === "en" ? "w-[30%]" : "w-[18%]"
                } py-[13px] flex justify-center items-center gap-2 text-2xl`}
              />
              {emailMessage && (
                <div
                  className={`absolute flex justify-center items-center gap-1 -bottom-4 ${
                    languageStorage === "en" ? "left-11" : "left-24"
                  }`}
                >
                  <IoIosCloseCircleOutline size={23} className="text-red-600" />
                  <p className="text-red-600 text-sm">{emailMessage}</p>
                </div>
              )}
            </div>
          </div>
        )}
      />
    </form>
  );
};

export default InputMembership;
