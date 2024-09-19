import { useAtom } from "jotai";
import { useState } from "react";

import { apiInstanceExpress } from "@/services/express/apiInstance";
import { emailStorageAtom, isFavoritedAtom, tokenStorageAtom } from "@/jotai/atoms";

const useFavoriteMovie = (data) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [notifMessage, setNotifMessage] = useState(null);

  const [emailStorage] = useAtom(emailStorageAtom)
  const [tokenStorage] = useAtom(tokenStorageAtom);
  const [, setIsFavorited] = useAtom(isFavoritedAtom);

  const resetNotification = () => {
    setTimeout(() => {
      setIsSubmit(false);
      setNotifMessage(null);
    }, 3000);
  }

  const handleAddFavoriteMovie = async () => {
    try {
      setIsSubmit(true);

      if (emailStorage && tokenStorage) {
        const addMovie = await apiInstanceExpress.post("my-movies", {
          email: emailStorage,
          token: tokenStorage,
          data,
        });

        if (addMovie.status !== 201) {
          return setNotifMessage("Failed to add movie");
        }

        setNotifMessage(`film ${data.title} berhasil di tambahkan`);
        setIsFavorited(true);
      }
    } catch (error) {
      setNotifMessage(`Error: error.message`);
    } finally {
      resetNotification();
    }
  }; 

  const handleDeleteFavoriteMovie = async () => {
    try {
      setIsSubmit(true);

      if (emailStorage && tokenStorage) {
        const deleteMovie = await apiInstanceExpress.delete("my-movies", {
          data: { email: emailStorage, token: tokenStorage, movie_id: data.id },
        });

        if (deleteMovie.status !== 204)
          return setNotifMessage(`film ${data.title} gagal di hapus`);

        setNotifMessage(`film ${data.title} berhasil di hapus`);
        setIsFavorited(false);
      }
    } catch (error) {
      setNotifMessage(`Error: error.message`);
    } finally {
      resetNotification();
    }
  };

  return {
    isSubmit,
    notifMessage,
    handleAddFavoriteMovie,
    handleDeleteFavoriteMovie
  };
}

export default useFavoriteMovie;