import React from "react";
import { useAtom } from "jotai";
import { useAuthState } from "react-firebase-hooks/auth";

import Navbar from "@/pages/Browse/Navbar";
import Loading from "@modules/Element/Loading";
import { auth } from "@/services/firebase/firebase";
import { emailStorageAtom, tokenStorageAtom } from "@/jotai/atoms";

const BrowseLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [tokenStorage] = useAtom(tokenStorageAtom);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!user && !emailStorage && !tokenStorage) return location.replace("/");

  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default BrowseLayout;
