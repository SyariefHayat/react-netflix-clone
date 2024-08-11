import React from "react";
import { useAtom } from "jotai";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "@/services/firebase/firebase";
import { emailStorageAtom, tokenStorageAtom } from "@/jotai/atoms";
import { apiInstanceExpress } from "@/services/express/apiInstance";

const AccountMenu = () => {
  const [tokenStorage, setTokenStorage] = useAtom(tokenStorageAtom);
  const [emailStorage, setEmailStorage] = useAtom(emailStorageAtom);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const data = { email: emailStorage, token: tokenStorage };
      const mongoSignOut = await apiInstanceExpress.delete("my-token", {
        data,
      });

      if (mongoSignOut.status === 204) {
        signOut(auth).then(() => {
          setTokenStorage(null);
          setEmailStorage(null);
          navigate("/");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex dropdown dropdown-hover dropdown-end cursor-pointer">
      <div className="avatar" tabIndex={0}>
        <div className="w-10 rounded">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="dropdown-content absolute top-10 z-30 bg-black text-stone-200 py-2 flex flex-col gap-4 border border-stone-300/80 rounded-xl px-4">
        <p className="text-sm italic">{emailStorage}</p>
        <button onClick={handleSignOut} tabIndex={0}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AccountMenu;
