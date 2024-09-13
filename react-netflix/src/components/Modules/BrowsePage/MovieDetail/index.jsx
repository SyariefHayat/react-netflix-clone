import React from "react";
import { useAtom } from "jotai";
import { FaStar } from "react-icons/fa";
import { GoPlay } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { MdAccessTimeFilled } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import { formatDate } from "@/utils/formatDate";
import useMovieDetail from "@/hooks/useMovieDetail";
import { truncateText } from "@/utils/truncateText";
import useNowPlayingMovies from "@/hooks/useNowPlayingMovies";
import { currentIndexAtom, idMovieAtom, isOpenModalAtom } from "@/jotai/atoms";

const MovieDetail = () => {
  const { idMovie } = useNowPlayingMovies();
  const { videoUrl, movieGenres, detailMovie } = useMovieDetail(idMovie);

  const [, setIdMovieAtom] = useAtom(idMovieAtom);
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [currentIndex, setCurrentIndex] = useAtom(currentIndexAtom);

  const navigate = useNavigate();

  const handlePlayBtnClick = () => {
    navigate("/watch/" + videoUrl);
    setCurrentIndex(0);
  };

  const handleDetailBtnClick = () => {
    setIdMovieAtom(idMovie);
    setIsOpenModal(true);
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-4 text-white">
      <p>{movieGenres}</p>
      <h1 className="text-3xl sm:text-5xl font-black">{detailMovie.title}</h1>
      <div className="flex gap-4">
        <p>{formatDate(detailMovie.release_date)}</p>
        <div className="flex justify-center items-center gap-2">
          <MdAccessTimeFilled />
          <p>{detailMovie.runtime} m</p>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <FaStar color="yellow" />
          <span>
            {detailMovie.vote_average
              ? Math.round(detailMovie.vote_average * 10) / 10
              : ""}
          </span>
        </div>
      </div>
      <p className="text-white">{truncateText(detailMovie.overview, 100)}</p>
      <div className="flex flex-wrap gap-4 mt-4">
        <button
          className="bg-red-600 py-2 px-8 rounded-md text-xl font-bold text-white flex items-center gap-1"
          onClick={handlePlayBtnClick}
        >
          <GoPlay /> Play
        </button>
        <button
          className="bg-stone-600/80 py-2 px-8 rounded-md text-white"
          onClick={handleDetailBtnClick}
        >
          More Detail
        </button>
        <button className="bg-stone-600/80 py-2 px-8 rounded-md text-white sm:flex justify-center items-center gap-2 hidden">
          Add to watchlist
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
