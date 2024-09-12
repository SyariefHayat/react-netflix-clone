import React, { useRef } from "react";
import { useAtom } from "jotai";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import EachUtils from "@/utils/EachUtils";
import Overlay from "@modules/Element/Overlay";
import { currentIndexAtom } from "@/jotai/atoms";
import useMovieDetail from "@/hooks/useMovieDetail";
import MovieDetail from "@modules/BrowsePage/MovieDetail";
import useNowPlayingMovies from "@/hooks/useNowPlayingMovies";

const Jumbotron = () => {
  const { nowPlayingMovies, idMovie } = useNowPlayingMovies();
  const { detailMovie } = useMovieDetail(idMovie);

  const [currentIndex, setCurrentIndex] = useAtom(currentIndexAtom);

  const ref = useRef(null);

  const scroll = (offset) => {
    ref.current.scrollLeft += offset;
  };

  const handleChevronLeftClick = () => {
    if (currentIndex === 0) {
      return setCurrentIndex(0);
    } else {
      scroll(-150);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleChevronRightClick = () => {
    scroll(150);
    if (currentIndex === nowPlayingMovies.length - 1) {
      setCurrentIndex(nowPlayingMovies.length - 1);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
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
      <div className="absolute top-1/2 -translate-y-1/2 xs:top-14 xs:-translate-y-0 w-full md:top-[20%] xl:top-1/2 xl:-translate-y-1/2 xl:left-4 py-8 px-4 md:px-6 sm:max-w-xl md:max-w-3xl lg:max-w-xl xl:max-w-xl z-20">
        <MovieDetail />
      </div>
      <div className="absolute hidden bottom-5 md:bottom-28 lg:bottom-[20%] xl:top-1/2 xl:-translate-y-1/2 xl:right-4 w-full px-5 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-xl h-96 z-20 xs:flex flex-col justify-center gap-2">
        <h3 className="text-3xl text-white font-semibold mb-2">Now Playing</h3>
        <div className="relative overflow-hidden">
          <div className="flex justify-between absolute left-0 w-full h-full">
            <button
              className="z-10 hover:bg-blue-900/50 text-white text-center opacity-75 transition-all ease-in-out duration-300 h-72 w-10"
              onClick={handleChevronLeftClick}
            >
              <GoChevronLeft size={32} />
            </button>
            <button
              className="z-10 hover:bg-blue-900/50 text-white text-center opacity-75 transition-all ease-in-out duration-300 h-72 w-10"
              onClick={handleChevronRightClick}
            >
              <GoChevronRight size={32} />
            </button>
          </div>
          <div ref={ref} className="carousel relative scroll-smooth space-x-4">
            <EachUtils
              of={nowPlayingMovies}
              render={(item, index) => (
                <div
                  key={index}
                  className="w-[48%] sm:w-[31%] md:w-[27%] lg:w-[31%] max-h-72 carousel-item"
                >
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
