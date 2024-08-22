import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import ReactPlayer from "react-player";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GoPlay, GoPlusCircle } from "react-icons/go";

import { getVideoUrl } from "@/services/tmdb/getVideoUrl";
import { idMovieAtom, isOpenModalAtom } from "@/jotai/atoms";
import { getMovieDetail } from "@/services/tmdb/getMovieDetail";
import Recommendation from "@modules/BrowsePage/Modal/Recommendation";

const Modal = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [movieDetail, setMovieDetail] = useState([]);

  const [idMovie] = useAtom(idMovieAtom);
  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);

  const navigate = useNavigate();

  useEffect(() => {
    if (idMovie && isOpenModal) {
      getMovieDetail({ movie_id: idMovie }).then((result) =>
        setMovieDetail(result)
      );
      getVideoUrl({ movie_id: idMovie }).then((result) => setVideoUrl(result));
    }
  }, [idMovie, isOpenModal]);

  const genreMapping = (genres) => {
    if (genres) {
      let result = "";
      genres.map((genre, index) => {
        if (index === genres.length - 1) {
          result += genre.name;
        } else {
          result += genre.name + ", ";
        }
      });
      return result;
    }
  };

  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  return (
    <dialog className={`modal ${isOpenModal ? "modal-open" : ""}`}>
      <div className="modal-box w-full max-w-screen-md p-0">
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
                className="h-full object-cover rounded-xl"
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
        <div className="flex gap-1 pl-80 pr-4 py-2 text-white ">
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
                <p>{movieDetail.vote_average}</p>
              </div>
              <p className="w-full">{movieDetail?.overview}</p>
            </div>
            <div className="flex flex-col gap-2 my-4">
              <p>Genre: {genreMapping(movieDetail?.genres)}</p>
              <p>Popularity: {movieDetail?.popularity}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-red-600 py-2 px-8 rounded-md text-xl font-bold text-white flex items-center gap-1">
                <GoPlay />
                Play
              </button>
              <button className="bg-stone-600/80 py-2 px-8 rounded-md text-white flex justify-center items-center gap-2">
                Add to watchlist
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
