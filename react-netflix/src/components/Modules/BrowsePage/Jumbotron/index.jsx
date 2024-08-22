import React, { useEffect, useState, useRef } from "react";
import { useAtom } from "jotai";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import {
  GoPlay,
  GoMute,
  GoUnmute,
  GoChevronLeft,
  GoChevronRight,
} from "react-icons/go";

import { getVideoUrl } from "@/services/tmdb/getVideoUrl";
import { idMovieAtom, isOpenModalAtom, currentIndexAtom } from "@/jotai/atoms";
import { getMoviesByType } from "@/services/tmdb/getMoviesByType";

import { getMovieDetail } from "@/services/tmdb/getMovieDetail";
import { FaStar } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import Overlay from "../../Element/Overlay";
import MovieList from "../MovieList";
import EachUtils from "@/utils/EachUtils";
import CarouselLayout from "@/components/Layouts/CarouselLayout";
import { AnimatePresence, motion } from "framer-motion";

const Jumbotron = () => {
  const [idMovie, setIdMovie] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [topMovies, setTopMovies] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  const [movieGenres, setMovieGenres] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [detailMovie, setDetailMovie] = useState([]);
  const [currentIndex, setCurrentIndex] = useAtom(currentIndexAtom);

  const [, setIdMovieAtom] = useAtom(idMovieAtom);
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);

  const navigate = useNavigate();

  useEffect(() => {
    getMoviesByType({ moviesType: "now_playing" }).then((result) => {
      setNowPlayingMovies(result);
      if (currentIndex <= result.length - 1) {
        // setTopMovies(result[0]);
        setIdMovie(result[currentIndex].id);
      }
    });
  }, [currentIndex]);

  useEffect(() => {
    if (idMovie) {
      getVideoUrl({ movie_id: idMovie }).then((result) => setVideoUrl(result));
      getMovieDetail({ movie_id: idMovie }).then((result) => {
        setDetailMovie(result);
        setMovieGenres(result.genres.map((genre) => genre.name));
      });
    }
  }, [idMovie]);

  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  const truncateText = (text, charLimit) => {
    if (typeof text !== "string") {
      return "";
    }
    return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
  };

  const ref = useRef(null);

  const scroll = (offset) => {
    ref.current.scrollLeft += offset;
  };

  return (
    <div className="relative h-screen w-full">
      <img
        src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${
          detailMovie.backdrop_path
        }`}
        className="w-full h-full object-cover"
        alt="backdrop-image"
      />
      <Overlay
        size={"w-full h-full"}
        position={"top-0"}
        color={"bg-[#00000080]"}
      />
      <div className="absolute top-1/2 -translate-y-1/2 left-4 p-8 max-w-xl z-20">
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
              {movieGenres.join(" | ")}
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
                <span>{detailMovie.vote_average}</span>
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
              onClick={() => {
                navigate("/watch/" + videoUrl);
                setIsMuted(true);
                setCurrentIndex(0);
              }}
            >
              <GoPlay /> Play
            </motion.button>
            <motion.button
              key={`btn-detail-${currentIndex}`}
              initial={{ opacity: 0, translateY: 100, filter: "blur(33px)" }}
              animate={{ opacity: 1, translateY: 0, filter: "blur(0)" }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.9 }}
              className="bg-stone-600/80 py-2 px-8 rounded-md text-white"
              onClick={() => {
                setIdMovieAtom(idMovie);
                setIsOpenModal(true);
              }}
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
              <IoMdAddCircleOutline />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 max-w-xl h-96 z-20 flex flex-col justify-center gap-2">
        <h3 className="text-3xl text-white font-semibold mb-2">Now Playing</h3>
        <div className="relative overflow-hidden">
          <div className="flex justify-between absolute left-0 w-full h-full">
            <button
              className="z-10 hover:bg-blue-900/50 text-white text-center opacity-75 transition-all ease-in-out duration-300 h-72 w-10"
              onClick={() => {
                if (currentIndex === 0) {
                  return setCurrentIndex(0);
                } else {
                  scroll(-150);
                  setCurrentIndex(currentIndex - 1);
                }
              }}
            >
              <GoChevronLeft size={32} />
            </button>
            <button
              className="z-10 hover:bg-blue-900/50 text-white text-center opacity-75 transition-all ease-in-out duration-300 h-72 w-10"
              onClick={() => {
                scroll(150);
                if (currentIndex === nowPlayingMovies.length - 1) {
                  setCurrentIndex(nowPlayingMovies.length - 1);
                } else {
                  setCurrentIndex(currentIndex + 1);
                }
              }}
            >
              <GoChevronRight size={32} />
            </button>
          </div>
          <div ref={ref} className="carousel relative scroll-smooth space-x-4">
            <EachUtils
              of={nowPlayingMovies}
              render={(item, index) => (
                <div key={index} className="w-[31%] max-h-72 carousel-item">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${
                      item.poster_path
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    className="max-h-72 cursor-pointer object-cover rounded-xl"
                    alt="poster-image"
                  />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
