import React, { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";

import {
  emailAtom,
  emailStorageAtom,
  languageStorageAtom,
  tokenStorageAtom,
} from "@/jotai/atoms";
import Navbar from "@/pages/Login/Navbar";
import Overlay from "@modules/Element/Overlay";
import Footer from "@modules/LandingPage/Footer";
import DefaultLayout from "@layouts/DefaultLayout";
import { auth } from "@/services/firebase/firebase";
import { JUMBOTRON_IMAGE } from "@/constants/listAsset";
import useEmailValidation from "@/hooks/useEmailValidation";
import usePasswordValidation from "@/hooks/usePasswordValidation";
import { apiInstanceExpress } from "@/services/express/apiInstance";

const Login = () => {
  const { emailMessage, validateEmail, handleEmail } = useEmailValidation();
  const { isShow, passwordMessage, toggleShowPassword, handlePassword } =
    usePasswordValidation();

  const [password, setPassword] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState(null);

  const [, setTokenStorage] = useAtom(tokenStorageAtom);
  const [, setEmailStorage] = useAtom(emailStorageAtom);
  const [languageStorage] = useAtom(languageStorageAtom);

  const [email] = useAtom(emailAtom);
  
  const navigate = useNavigate();

  const goToFormPage = () => {
    navigate("/", { state: { focusInput: true } });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const login = await signInWithEmailAndPassword(auth, email, password);

      if (login) {
        const firebaseToken = await getIdToken(login.user);
        const addToken = await apiInstanceExpress.post("my-token", {
          email,
          password,
          token: firebaseToken,
        });

        if (addToken.status === 200) {
          setTokenStorage(firebaseToken);
          setEmailStorage(login.user.email);

          setTimeout(() => {
            setIsLoading(false);
            navigate("/browse");
          }, 2000);
        }
      }
    } catch (error) {
      setIsLoading(false);
      setLoginMessage(
        languageStorage === "en"
          ? "Failed to login. Please check your email and password."
          : `Sandi untuk ${email} salah Kamu bisa menggunakan kode masuk, mengatur ulang sandi, atau mencoba lagi.`
      );
    }
  };

  return (
    <DefaultLayout>
      <Navbar />
      <Overlay
        position={"top-0 left-0"}
        size={"w-full h-full"}
        color={"bg-[#00000080]"}
      />
      <img
        src={JUMBOTRON_IMAGE}
        alt="jumbotron-bg"
        className="image-full w-full h-[100vh] object-cover opacity-70"
      />
      <div className="absolute top-20 md:top-1/2 md:-translate-y-1/2 lg:top-20 lg:-translate-y-0 left-1/2 -translate-x-1/2 z-10 bg-black/80 px-16 pt-10 pb-16 rounded-xl max-w-md w-full">
        <form action="" className="flex flex-col gap-4">
          <h3 className="text-white text-3xl font-bold mb-5">
            {languageStorage === "en" ? "Sign In" : "Masuk"}
          </h3>
          {loginMessage && (
            <div className="bg-yellow-600 p-5 rounded-md text-black">
              <h4 className="text-lg font-medium mb-2">
                {languageStorage === "en"
                  ? `Incorrect password for ${email}`
                  : `Sandi untuk ${email} salah`}
              </h4>
              <p>
                {languageStorage === "en"
                  ? "You can use a sign-in-code, reset your passsword or try again."
                  : "Kamu bisa menggunakan kode masuk, mengatur ulang sandi, atau mencoba lagi."}
              </p>
            </div>
          )}
          <div className="relative">
            <input
              type="text"
              placeholder="Email"
              value={email ? email : ""}
              onChange={(e) => {
                setLoginMessage(null);
                validateEmail(e.target.value);
              }}
              onBlur={handleEmail}
              className="w-full text-white pl-4 pt-5 pr-4 pb-3 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent focus:outline outline-2 outline-offset-2 outline-white"
            />
            <label
              className={`absolute top-1 left-0 pl-4 peer-placeholder-shown:top-3.5 peer-focus:top-1 peer-focus:text-sm transition-all ${
                email ? "text-sm" : "text-lg"
              } -z-10`}
            >
              Email
            </label>
          </div>
          {emailMessage && (
            <div className="flex items-center gap-1">
              <IoIosCloseCircleOutline size={23} className="text-red-600" />
              <p className="text-red-600 text-sm">{emailMessage}</p>
            </div>
          )}
          <div className="relative flex items-center">
            <input
              type={isShow ? "text" : "password"}
              placeholder={languageStorage === "en" ? "Password" : "Sandi"}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                handlePassword(password);
              }}
              className="w-full text-white pl-4 pt-5 pr-4 pb-3 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent focus:outline outline-2 outline-offset-2 outline-white"
            />
            <label
              className={`absolute top-1 left-0 pl-4 peer-placeholder-shown:top-3.5 peer-focus:top-1 peer-focus:text-sm transition-all ${
                password ? "text-sm" : "text-lg"
              } -z-10`}
            >
              {languageStorage === "en" ? "Password" : "Sandi"}
            </label>
            {isFocused &&
              (isShow ? (
                <FaRegEye
                  size={25}
                  className="absolute text-slate-400 cursor-pointer right-3"
                  onClick={toggleShowPassword}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    toggleShowPassword();
                  }}
                />
              ) : (
                <FaRegEyeSlash
                  size={25}
                  className="absolute text-slate-400 cursor-pointer right-3"
                  onClick={toggleShowPassword}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    toggleShowPassword();
                  }}
                />
              ))}
          </div>
          {passwordMessage && (
            <div className="flex items-center gap-1">
              <IoIosCloseCircleOutline size={23} className="text-red-600" />
              <p className="text-red-600 text-sm">{passwordMessage}</p>
            </div>
          )}
          <div>
            <button
              disabled={isLoading}
              onClick={handleLogin}
              className="bg-red-600 py-2 mb-3 w-full text-white font-bold rounded-md disabled:cursor-wait"
            >
              {languageStorage === "en" ? "Sign In" : "Masuk"}
            </button>
            <p className="text-center">
              {languageStorage === "en" ? "OR" : "ATAU"}
            </p>
            <button className="bg-white/20 py-2 my-3 w-full text-white font-bold rounded-md disabled:cursor-wait">
              {languageStorage === "en"
                ? "Use a Sign-In Code"
                : "Gunakan Kode Masuk"}
            </button>
            <p className="text-center text-white">
              <a href="#">
                {languageStorage === "en"
                  ? "Forgot Password?"
                  : "Lupa Password?"}
              </a>
            </p>
            <div className="flex items-center gap-2 my-3">
              <input
                id="remember"
                type="checkbox"
                className="w-5 h-5 cursor-pointer"
              />
              <label htmlFor="remember" className="text-white">
                {languageStorage === "en" ? "Remember me" : "Ingat saya"}
              </label>
            </div>
            <p>
              {languageStorage === "en"
                ? "New to Netflix?"
                : "Baru di Netflix?"}
              <span
                onClick={goToFormPage}
                className="text-white hover:underline cursor-pointer ml-2"
              >
                {languageStorage === "en" ? "Sign up now." : "Daftar sekarang."}
              </span>
            </p>
          </div>
        </form>
      </div>
      <Footer style={"pb-16 pt-52"} />
    </DefaultLayout>
  );
};
export default Login;
