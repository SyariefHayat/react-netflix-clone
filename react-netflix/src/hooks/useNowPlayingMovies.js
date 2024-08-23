import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { currentIndexAtom } from "@/jotai/atoms";
import { getMoviesByType } from "@/services/tmdb/getMoviesByType";

const useNowPlayingMovies = () => {
  const [idMovie, setIdMovie] = useState(null);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const [currentIndex] = useAtom(currentIndexAtom);

  useEffect(() => {
    getMoviesByType({ moviesType: "now_playing" }).then((result) => {
      setNowPlayingMovies(result);

      if (currentIndex <= result.length - 1) {
        setIdMovie(result[currentIndex].id);
      }
    });
  }, [currentIndex]);

  return { nowPlayingMovies, idMovie };
};

export default useNowPlayingMovies;
