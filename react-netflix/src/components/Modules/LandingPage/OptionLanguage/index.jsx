import React from "react";
import { useAtom } from "jotai";

import EachUtils from "@/utils/EachUtils";
import { languageStorageAtom } from "@/jotai/atoms.js";
import { LIST_LANGUAGE } from "@/constants/listLanguage";

const OptionLanguage = () => {
  const [languageStorage, setLanguageStorage] = useAtom(languageStorageAtom);

  return (
    <div className="relative bg-[#1A1510] text-white rounded border border-gray-400 w-[200px]">
      <div className="absolute top-[8px] left-3 z-[21]">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="default-ltr-cache-4z3qvp e1svuwfo1"
          data-name="Languages"
          aria-labelledby=":R135dajalalbd:"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.7668 5.33333L10.5038 5.99715L9.33974 8.9355L8.76866 10.377L7.33333 14H9.10751L9.83505 12.0326H13.4217L14.162 14H16L12.5665 5.33333H10.8278H10.7668ZM10.6186 9.93479L10.3839 10.5632H11.1036H12.8856L11.6348 7.2136L10.6186 9.93479ZM9.52722 4.84224C9.55393 4.77481 9.58574 4.71045 9.62211 4.64954H6.41909V2H4.926V4.64954H0.540802V5.99715H4.31466C3.35062 7.79015 1.75173 9.51463 0 10.4283C0.329184 10.7138 0.811203 11.2391 1.04633 11.5931C2.55118 10.6795 3.90318 9.22912 4.926 7.57316V12.6667H6.41909V7.51606C6.81951 8.15256 7.26748 8.76169 7.7521 9.32292L8.31996 7.88955C7.80191 7.29052 7.34631 6.64699 6.9834 5.99715H9.06968L9.52722 4.84224Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <select
        className="w-full relative z-[22] bg-transparent py-1 px-9 rounded focus:outline outline-2 outline-offset-[3px] outline-white appearance-none"
        value={languageStorage}
        onChange={(e) => setLanguageStorage(e.target.value)}
      >
        <EachUtils
          of={LIST_LANGUAGE}
          render={(item, index) => (
            <option key={index} value={item.value} className="text-black">
              {item.name}
            </option>
          )}
        />
      </select>
      <div className="absolute top-[8px] right-3 z-[21]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          role="img"
          data-icon="CaretDownSmall"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.5976 6.5C11.7461 6.5 11.8204 6.67956 11.7154 6.78457L8.23574 10.2643C8.10555 10.3945 7.89445 10.3945 7.76425 10.2643L4.28457 6.78457C4.17956 6.67956 4.25393 6.5 4.40244 6.5H11.5976Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default OptionLanguage;
