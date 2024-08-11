import { useAtom } from "jotai";
import { useState } from "react";
import { languageStorageAtom } from "@/jotai/atoms";

const usePasswordValidation = () => {
  const [isShow, setIsShow] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);

  const [languageStorage] = useAtom(languageStorageAtom);

  const toggleShowPassword = () => {
    setIsShow(!isShow);
  };

  const handlePassword = (data) => {
    if (!data)
      return setPasswordMessage(
        languageStorage === "en"
          ? "password must be filled in"
          : "Password harus diisi"
      );

    if (data.length <= 8) {
      return setPasswordMessage(
        languageStorage === "en"
          ? "Password must contain a minimum of 8 characters"
          : "Password harus berisi minimal 8 karakter"
      );
    }

    return setPasswordMessage(null);
  };

  return {
    isShow,
    passwordMessage,
    toggleShowPassword,
    handlePassword,
  };
};

export default usePasswordValidation;
