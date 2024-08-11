import { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import {
  emailAtom,
  emailStorageAtom,
  isEmailValid,
  languageStorageAtom,
} from "@/jotai/atoms";
import { emailValidation } from "@/utils/emailValidation";

const useEmailValidation = () => {
  const [isMessage, setIsMessage] = useState(false);
  const [emailMessage, setEmailMessage] = useState(null);

  const [email, setEmail] = useAtom(emailAtom);
  const [languageStorage] = useAtom(languageStorageAtom);
  const [isEmailValidAtom, setIsEmailValidAtom] = useAtom(isEmailValid);

  const navigate = useNavigate();

  const validateEmail = (data) => {
    setEmail(data);
    setIsEmailValidAtom(false);

    if (emailValidation(data)) {
      setEmailMessage(null);
      return setIsEmailValidAtom(true);
    }

    if (isMessage && !data) {
      return setEmailMessage(
        languageStorage === "en"
          ? "Email must be filled in"
          : "Email harus diisi"
      );
    }

    if (isMessage && !emailValidation(data)) {
      return setEmailMessage(
        languageStorage === "en"
          ? "Enter a valid email address"
          : "Masukkan alamat email yang valid"
      );
    }
  };

  const handleEmail = (e, path) => {
    e.preventDefault();

    if (isEmailValidAtom) {
      setIsMessage(false);
      return navigate(path);
    }

    if (!email) {
      setIsMessage(true);
      setEmailMessage(
        languageStorage === "en"
          ? "Email must be filled in"
          : "Email harus diisi"
      );
    } else {
      setIsMessage(true);
      setEmailMessage(
        languageStorage === "en"
          ? "Enter a valid email address"
          : "Masukkan alamat email yang valid"
      );
    }
  };

  return {
    emailMessage,
    validateEmail,
    handleEmail,
  };
};

export default useEmailValidation;
