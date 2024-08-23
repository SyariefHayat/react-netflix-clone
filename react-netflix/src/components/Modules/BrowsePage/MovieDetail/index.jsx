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
    <AnimatePresence mode="wait">
      <motion.div
        key={`container-${currentIndex}`}
        exit={{ opacity: 0, translateY: -20 }}
        className="flex flex-col gap-4 text-white"
      >
        <motion.p
          key={`genre-${currentIndex}`}
          initial={{ opacity: 0, translateY: 100, filter: "blur(33px)" }}
          animate={{ opacity: 1, translateY: 0, filter: "blur(0)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {movieGenres}
        </motion.p>
        <motion.h1
          key={`title-${currentIndex}`}
          initial={{ opacity: 0, translateY: 100, filter: "blur(33px)" }}
          animate={{ opacity: 1, translateY: 0, filter: "blur(0)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-3xl sm:text-5xl font-black"
        >
          {detailMovie.title}
        </motion.h1>
        <motion.div
          key={`desc-${currentIndex}`}
          initial={{ opacity: 0, translateY: 100, filter: "blur(33px)" }}
          animate={{ opacity: 1, translateY: 0, filter: "blur(0)" }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
          className="flex gap-4"
        >
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
        </motion.div>
        <motion.p
          key={`overview-${currentIndex}`}
          initial={{ opacity: 0, translateY: 100, filter: "blur(33px)" }}
          animate={{ opacity: 1, translateY: 0, filter: "blur(0)" }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
          className="text-white"
        >
          {truncateText(detailMovie.overview, 300)}
        </motion.p>
      </motion.div>
      <motion.div
        key={`btn-container-${currentIndex}`}
        exit={{ opacity: 0, translateY: -20 }}
        className="flex gap-4 mt-4"
      >
        <motion.button
          key={`btn-play-${currentIndex}`}
          initial={{ opacity: 0, translateY: 100, filter: "blur(33px)" }}
          animate={{ opacity: 1, translateY: 0, filter: "blur(0)" }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.9 }}
          className="bg-red-600 py-2 px-8 rounded-md text-xl font-bold text-white flex items-center gap-1"
          onClick={handlePlayBtnClick}
        >
          <GoPlay /> Play
        </motion.button>
        <motion.button
          key={`btn-detail-${currentIndex}`}
          initial={{ opacity: 0, translateY: 100, filter: "blur(33px)" }}
          animate={{ opacity: 1, translateY: 0, filter: "blur(0)" }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.9 }}
          className="bg-stone-600/80 py-2 px-8 rounded-md text-white"
          onClick={handleDetailBtnClick}
        >
          More Detail
        </motion.button>
        <motion.button
          key={`btn-add-${currentIndex}`}
          initial={{ opacity: 0, translateY: 100, filter: "blur(33px)" }}
          animate={{ opacity: 1, translateY: 0, filter: "blur(0)" }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.9 }}
          className="bg-stone-600/80 py-2 px-8 rounded-md text-white flex justify-center items-center gap-2"
        >
          <p>Add to watchlist</p>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default MovieDetail;
