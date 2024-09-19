import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { GoPlay, GoPlusCircle } from "react-icons/go";
import { MdClose } from "react-icons/md";
import { LuMinusCircle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { formatDate } from "@/utils/formatDate";
import { genreMapping } from "@/utils/genreMapping";
import useMovieDetail from "@/hooks/useMovieDetail";
import useFavoriteMovie from "@/hooks/useFavoriteMovie";
import Notification from "@modules/Element/Notification";
import { getMovieDetail } from "@/services/tmdb/getMovieDetail";
import Recommendation from "@modules/BrowsePage/Modal/Recommendation";
import { idMovieAtom, isFavoritedAtom, isOpenModalAtom } from "@/jotai/atoms";

const Modal = () => {
  const [movieDetail, setMovieDetail] = useState([]);

  const {notifMessage, isSubmit, handleAddFavoriteMovie, handleDeleteFavoriteMovie} = useFavoriteMovie(movieDetail)
  
  const [idMovie] = useAtom(idMovieAtom);
  const { videoUrl } = useMovieDetail(idMovie);
  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [isFavorited] = useAtom(isFavoritedAtom);

  const navigate = useNavigate();

  useEffect(() => {
    if (idMovie && isOpenModal) {
      getMovieDetail({ movie_id: idMovie }).then((result) =>
        setMovieDetail(result)
      );
    }
  }, [idMovie, isOpenModal]);

  const handlePlayBtnClick = () => {
    navigate(`/watch/${videoUrl}`);
  };

  return (
    <dialog className={`modal ${isOpenModal ? "modal-open" : ""}`}>
      {isSubmit && notifMessage && <Notification message={notifMessage} />}
      <div className="modal-box w-[90%] lg:w-full max-w-screen-md p-0">
        <div className="relative">
          <div className="h-[250px] w-full">
            <img
              src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${
                movieDetail.backdrop_path
              }`}
              className="w-full h-full object-cover"
              alt="backdrop-image"
            />
            <div className="max-w-56 absolute top-20 left-12">
              <img
                src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${
                  movieDetail.poster_path
                }`}
                className="hidden sm:block h-full object-cover rounded-xl"
                alt="poster-image"
              />
            </div>
            <button
              className="flex justify-center items-center absolute top-5 right-5 py-1 px-2 bg-black rounded-md gap-2 text-white"
              onClick={() => setIsOpenModal(false)}
            >
              <MdClose size={20} />
              Close
            </button>
          </div>
        </div>
        <div className="flex gap-1 pl-4 sm:pl-80 sm:pr-4 py-2 text-white ">
          <div className="py-2">
            <h2 className="text-4xl font-black text-white">
              {movieDetail?.title}
            </h2>
            <div>
              <div className="flex gap-4 py-4">
                <p>{formatDate(movieDetail.release_date)}</p>
                <p className="text-green-400/90">
                  {movieDetail?.runtime} Minutes
                </p>
                <p>{movieDetail?.vote_average ? Math.round(movieDetail.vote_average * 10) / 10
                : ""}</p>
              </div>
              <p className="w-full">{movieDetail?.overview}</p>
            </div>
            <div className="flex flex-col gap-2 my-4">
              <p>Genre: {genreMapping(movieDetail?.genres, ", ")}</p>
              <p>Popularity: {movieDetail?.popularity}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-red-600 py-2 px-8 rounded-md text-xl font-bold text-white flex items-center gap-1"
                onClick={handlePlayBtnClick}
              >
                <GoPlay />
                Play
              </button>
              <button className="bg-stone-600/80 py-2 px-8 rounded-md text-white flex justify-center items-center gap-2"
              onClick={isFavorited ? handleDeleteFavoriteMovie : handleAddFavoriteMovie}
              >
                Add to watchlist
                {isFavorited? (
                  <LuMinusCircle size={17}/>
                ) : (
                  <GoPlusCircle size={17}/>
                )}
              </button>
            </div>
          </div>
        </div>
        <Recommendation />
      </div>
    </dialog>
  );
};

export default Modal;
