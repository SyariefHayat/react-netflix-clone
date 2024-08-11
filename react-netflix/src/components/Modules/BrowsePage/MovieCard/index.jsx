import React, { useState } from "react";
import { useAtom } from "jotai";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GoPlay, GoPlusCircle, GoChevronDown, GoTrash } from "react-icons/go";

import {
  emailStorageAtom,
  idMovieAtom,
  isFavoritedAtom,
  isFetchingAtom,
  isOpenModalAtom,
  tokenStorageAtom,
} from "@/jotai/atoms";
import Skeleton from "./Skeleton";
import Notification from "@modules/Element/Notification";
import { getVideoUrl } from "@/services/tmdb/getVideoUrl";
import { apiInstanceExpress } from "@/services/express/apiInstance";
import { checkFavoriteMovies } from "@/services/tmdb/checkFavoriteMovies";

const MovieCard = ({ data, isHover, setIsHover, moviesType }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [notifMessage, setNotifMessage] = useState(null);
  const [movieTypeState, setMovieTypeState] = useState(null);

  const [tokenStorage] = useAtom(tokenStorageAtom);
  const [emailStorage] = useAtom(emailStorageAtom);

  const [isFetching] = useAtom(isFetchingAtom);
  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [isFavorited, setIsFavorited] = useAtom(isFavoritedAtom);

  const navigate = useNavigate();

  const handleAddFavoriteMovie = async () => {
    try {
      setIsSubmit(true);

      if (emailStorage && tokenStorage) {
        const addMovie = await apiInstanceExpress.post("my-movies", {
          email: emailStorage,
          token: tokenStorage,
          data,
        });

        if (addMovie.status !== 201)
          return setNotifMessage("Failed to add movie");

        setNotifMessage(`film ${data.title} berhasil di tambahkan`);
        setIsFavorited(true);

        setTimeout(() => {
          setIsSubmit(false);
          setNotifMessage(null);
        }, 3000);
      }
    } catch (error) {
      setNotifMessage(error.message);

      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage(null);
      }, 3000);
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

        setTimeout(() => {
          setIsSubmit(false);
          setNotifMessage(null);
        }, 3000);
      }
    } catch (error) {
      setNotifMessage(error.message);

      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage(null);
      }, 3000);
    }
  };

  if (isFetching) return <Skeleton />;

  return (
    <>
      {isSubmit && notifMessage && <Notification message={notifMessage} />}
      {isHover && idMovie === data.id && moviesType === movieTypeState ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0, ease: "easeInOut" }}
          className="relative shadow-md transition-all w-full"
        >
          <div className="hover:scale-110 transition-all">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoUrl}`}
              playing={true}
              muted={true}
              loop={true}
              controls={false}
              width={"100%"}
              height={"180px"}
            />
          </div>
          <div className="h-auto p-4 bg-[#141414] flex flex-col gap-1.5 rounded-b-xl">
            <section className="mt-1 flex justify-between">
              <div className="flex gap-2">
                <button onClick={() => navigate("/watch/" + videoUrl)}>
                  <GoPlay size={32} />
                </button>
                <button
                  className="hover:text-white transition-all"
                  onClick={
                    isFavorited
                      ? handleDeleteFavoriteMovie
                      : handleAddFavoriteMovie
                  }
                >
                  {isFavorited ? (
                    <GoTrash size={32} />
                  ) : (
                    <GoPlusCircle size={32} />
                  )}
                </button>
              </div>
              <div>
                <button
                  className="rounded-full p-1 border"
                  onClick={() => setIsOpenModal(true)}
                >
                  <GoChevronDown size={20} />
                </button>
              </div>
            </section>
            <section className="text-left">
              <h2 className="font-semibold">{data.title}</h2>
              <p className="text-green-400">Popularity: {data.popularity}</p>
            </section>
          </div>
        </motion.div>
      ) : (
        <img
          src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${data.poster_path}`}
          className="w-full max-h-72 cursor-pointer object-cover rounded-xl"
          onMouseEnter={() => {
            setIsHover(true);
            setIdMovie(data.id);
            setMovieTypeState(moviesType);
            getVideoUrl({ movie_id: data.id }).then((result) =>
              setVideoUrl(result)
            );
            checkFavoriteMovies({
              emailStorage,
              tokenStorage,
              idMovie: data.id,
            }).then((result) => setIsFavorited(result));
          }}
        />
      )}
    </>
  );
};

export default MovieCard;
