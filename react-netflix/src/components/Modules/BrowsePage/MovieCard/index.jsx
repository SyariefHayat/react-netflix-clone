import React, { useState } from "react";
import { useAtom } from "jotai";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { LuMinusCircle } from "react-icons/lu";
import { GoPlay, GoPlusCircle, GoChevronDown } from "react-icons/go";

import {
  emailStorageAtom,
  idMovieAtom,
  isFavoritedAtom,
  isFetchingAtom,
  isOpenModalAtom,
  tokenStorageAtom,
} from "@/jotai/atoms";
import Skeleton from "./Skeleton";
import useFavoriteMovie from "@/hooks/useFavoriteMovie";
import Notification from "@modules/Element/Notification";
import { getVideoUrl } from "@/services/tmdb/getVideoUrl";
import { checkFavoriteMovies } from "@/services/tmdb/checkFavoriteMovies";

const MovieCard = ({ data, isHover, setIsHover, moviesType }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [movieTypeState, setMovieTypeState] = useState(null);
  const {notifMessage, isSubmit, handleAddFavoriteMovie, handleDeleteFavoriteMovie} = useFavoriteMovie(data);

  const [tokenStorage] = useAtom(tokenStorageAtom);
  const [emailStorage] = useAtom(emailStorageAtom);

  const [isFetching] = useAtom(isFetchingAtom);
  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [isFavorited, setIsFavorited] = useAtom(isFavoritedAtom);

  const navigate = useNavigate();

  if (isFetching) return <Skeleton />;

  return (
    <>
      {isSubmit && notifMessage && <Notification message={notifMessage} />}
      {isHover && idMovie === data.id && moviesType === movieTypeState ? (
        <div className="w-full max-h-72 rounded-xl">
          <div className=" transition-all">
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
          <div className="w-full h-32 p-4 rounded-b-xl bg-[#141414] flex flex-col gap-1.5 justify-center">
            <section className="text-left">
              <h2 className="font-black">{data.title}</h2>
            </section>
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
                    <LuMinusCircle size={32} />
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
          </div>
        </div>
      ) : (
        <img
          src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${data.poster_path}`}
          className="w-full max-h-72 mb-5 object-cover cursor-pointer rounded-xl"
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
