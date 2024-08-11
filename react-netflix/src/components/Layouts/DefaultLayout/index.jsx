import React from "react";
import { useAtom } from "jotai";
import { useAuthState } from "react-firebase-hooks/auth";

import Loading from "@modules/Element/Loading";
import { auth } from "@/services/firebase/firebase";
import { emailStorageAtom, tokenStorageAtom } from "@/jotai/atoms";

const DefaultLayout = ({ children }) => {
  const [emailStorage] = useAtom(emailStorageAtom);
  const [tokenStorage] = useAtom(tokenStorageAtom);
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (user && emailStorage && tokenStorage) return location.replace("/browse");

  return <div>{children}</div>;
};

export default DefaultLayout;
