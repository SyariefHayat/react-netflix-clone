import React, { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

import EachUtils from "@/utils/EachUtils";
import Navbar from "@/pages/Register/Navbar";
import Footer from "@modules/LandingPage/Footer";
import DefaultLayout from "@layouts/DefaultLayout";
import { auth } from "@/services/firebase/firebase";
import useEmailValidation from "@/hooks/useEmailValidation";
import { emailAtom, languageStorageAtom } from "@/jotai/atoms";
import usePasswordValidation from "@/hooks/usePasswordValidation";
import { apiInstanceExpress } from "@/services/express/apiInstance";
import { LIST_REGISTER_EN, LIST_REGISTER_ID } from "@/constants/listRegister";

const Register = () => {
  const { emailMessage, validateEmail, handleEmail } = useEmailValidation();
  const { passwordMessage, handlePassword } = usePasswordValidation();

  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterMsg, setIsRegisterMsg] = useState(false);

  const [email] = useAtom(emailAtom);
  const [languageStorage] = useAtom(languageStorageAtom);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const register = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (register) {
        await signOut(auth);
        const addUser = await apiInstanceExpress.post("sign-up", {
          email,
          password,
        });

        if (addUser.status === 201) {
          toast("User created successfully");
          setTimeout(() => {
            setIsLoading(false);
            setIsRegisterMsg(false);
            navigate("/login");
          }, 2000);
        }
      }
    } catch (error) {
      setIsLoading(false);
      setIsRegisterMsg(true);
    }
  };

  return (
    <DefaultLayout>
      <div className="bg-white w-full h-[120%] absolute">
        <Navbar />
        <div className="relative top-32 mb-40 left-1/2 -translate-x-1/2 z-10 px-12 py-5 rounded-xl max-w-xl w-full ">
          <EachUtils
            of={languageStorage === "en" ? LIST_REGISTER_EN : LIST_REGISTER_ID}
            render={(item, index) => (
              <form action="" key={index} className="flex flex-col gap-4">
                {isRegisterMsg && (
                  <div className="bg-yellow-600 p-5 rounded-md text-black">
                    <h3 className="text-lg font-medium mb-2">
                      {item.msgTitle}
                    </h3>
                    <p>
                      <a href="/login" className="underline">
                        {item.msgLink}
                      </a>{" "}
                      {item.msgDesc}
                    </p>
                  </div>
                )}
                <div className="text-black mb-2 flex flex-col items-start gap-5">
                  <h3 className="text-4xl font-semibold">{item.title}</h3>
                  <p className="text-xl">{item.desc}</p>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    value={email ? email : ""}
                    placeholder="Email"
                    onChange={(e) => validateEmail(e.target.value)}
                    onBlur={handleEmail}
                    className="w-full text-black pl-4 pt-5 pr-4 pb-3 bg-white/50 rounded-md border border-black peer placeholder-transparent"
                  />
                  <label
                    className={`absolute top-1 left-0 pl-4 peer-placeholder-shown:top-3.5 peer-focus:top-1 peer-focus:text-sm transition-all text-black font-semibold ${
                      email ? "text-sm" : "text-lg"
                    } -z-10`}
                  >
                    Email
                  </label>
                  {emailMessage && (
                    <div className="flex items-center gap-1 mt-2">
                      <IoIosCloseCircleOutline
                        size={23}
                        className="text-red-600"
                      />
                      <p className="text-red-600 text-sm">{emailMessage}</p>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder={item.placeholder}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handlePassword(password)}
                    className="w-full text-black pl-4 pt-5 pr-4 pb-3 bg-white/50 rounded-md border border-black peer placeholder-transparent"
                  />
                  <label
                    className={`absolute top-1 left-0 pl-4 peer-placeholder-shown:top-3.5 peer-focus:top-1 peer-focus:text-sm transition-all text-black font-semibold ${
                      password ? "text-sm" : "text-lg"
                    } -z-10`}
                  >
                    {item.placeholder}
                  </label>
                  {passwordMessage && (
                    <div className="flex items-center gap-1 mt-2">
                      <IoIosCloseCircleOutline
                        size={23}
                        className="text-red-600"
                      />
                      <p className="text-red-600 text-sm">{passwordMessage}</p>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    disabled={isLoading}
                    onClick={handleRegister}
                    className="bg-red-600 py-4 mt-3 w-full text-white text-xl font-bold rounded-md disabled:bg-red-400 disabled:cursor-wait"
                  >
                    {item.buttonSubmit}
                  </button>
                </div>
              </form>
            )}
          />
        </div>
        <Footer />
      </div>
    </DefaultLayout>
  );
};
export default Register;
