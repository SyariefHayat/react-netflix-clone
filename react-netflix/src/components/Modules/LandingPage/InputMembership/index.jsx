import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { useLocation } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";

import EachUtils from "@/utils/EachUtils";
import useEmailValidation from "@/hooks/useEmailValidation";
import { emailAtom, languageStorageAtom } from "@/jotai/atoms";
import { LIST_CTA_EN, LIST_CTA_ID } from "@/constants/listCTA";
import DefaultButton from "@modules/LandingPage/DefaultButton";

const InputMembership = ({ instanceId }) => {
  const { emailMessage, validateEmail, handleEmail } = useEmailValidation();

  const [email] = useAtom(emailAtom);
  const [languageStorage] = useAtom(languageStorageAtom);

  const inputRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.focusInput && instanceId === 1) {
      inputRef.current.focus();
    }
  }, [location]);

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
                ref={inputRef}
                value={email ? email : ""}
                placeholder={item.labelInput}
                onChange={(e) => validateEmail(e.target.value)}
                className={`w-[55%] text-white pl-4 pt-5 pr-4 pb-3 bg-dark/50 rounded-md border peer placeholder-transparent focus:outline outline-2 outline-offset-2 outline-white ${
                  emailMessage ? "border-red-600" : "border-white/50"
                }`}
              />
              <label
                className={`absolute top-0 left-0 ${
                  instanceId === 1
                    ? `peer-placeholder-shown:top-[33px] peer-focus:top-5 ${
                        languageStorage === "en"
                          ? "md:pl-[60px]"
                          : "md:pl-[70px]"
                      }`
                    : `peer-placeholder-shown:top-[33px] peer-focus:top-5 md:pl-[65px] ${
                        languageStorage === "en"
                          ? "lg:pl-[60px]"
                          : "lg:pl-[70px]"
                      }`
                } pl-[40px] sm:pl-[60px] top-5 peer-focus:text-sm transition-all ${
                  email ? "text-sm" : "text-md"
                }`}
              >
                {item.labelInput}
              </label>
              <DefaultButton
                isArrowIcon={true}
                text={item.buttonSubmit}
                onClick={(e) => handleEmail(e, "/register")}
                styles={`flex w-[30%] ${
                  languageStorage === "en" ? "text-xs" : "text-2xl"
                } ${
                  instanceId === 1
                    ? "sm:text-2xl py-[13px]"
                    : "sm:text-xl py-[15px]"
                }  flex justify-center items-center gap-2`}
              />
              {emailMessage && (
                <div className="absolute flex justify-center items-center gap-1 -bottom-4 left-5 sm:left-10 md:left-14">
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
