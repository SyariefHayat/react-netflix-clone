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
      <div className="absolute top-1/2 -translate-y-1/2 left-4 p-8 max-w-xl z-20">
        <MovieDetail />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 max-w-xl h-96 z-20 flex flex-col justify-center gap-2">
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
