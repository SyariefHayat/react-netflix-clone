import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";

import EachUtils from "@/utils/EachUtils";
import MovieCard from "@modules/BrowsePage/MovieCard";
import { searchMovies } from "@/services/tmdb/searchMovies";
import { idMovieAtom, isFetchingAtom, searchMoviesAtom } from "@/jotai/atoms";

const SearchMovies = () => {
  const [isHover, setIsHover] = useState(false);
  const [movieList, setMovieList] = useState([]);

  const [, setIdMovie] = useAtom(idMovieAtom);
  const [searchQuery] = useAtom(searchMoviesAtom);
  const [, setIsFetching] = useAtom(isFetchingAtom);

  useEffect(() => {
    if (searchQuery) {
      searchMovies({ query: searchQuery })
        .then((result) => {
          setIsFetching(true);
          setMovieList(result);
        })
        .finally(() => {
          setTimeout(() => {
            setIsFetching(false);
          }, 500);
        });
    }
  }, [searchQuery]);

  return (
    <div className="grid grid-cols-4 p-8 mt-10 gap-4">
      {movieList && (
        <EachUtils
          of={movieList}
          render={(item, index) => (
            <div
              className="h-72 mt-4"
              key={index}
              onMouseLeave={() => {
                setIsHover(false);
                setIdMovie(null);
              }}
            >
              <MovieCard
                data={item}
                isHover={isHover}
                setIsHover={setIsHover}
              />
            </div>
          )}
        />
      )}
    </div>
  );
};

export default SearchMovies;
