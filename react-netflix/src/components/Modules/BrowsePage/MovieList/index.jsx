import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";

import EachUtils from "@/utils/EachUtils";
import CarouselLayout from "@layouts/CarouselLayout";
import MovieCard from "@modules/BrowsePage/MovieCard";
import { idMovieAtom, isFetchingAtom } from "@/jotai/atoms";
import { getMoviesByType } from "@/services/tmdb/getMoviesByType";

const MovieList = ({ title, moviesType }) => {
  const [isHover, setIsHover] = useState(false);
  const [movieList, setMovieList] = useState([]);

  const [, setIdMovie] = useAtom(idMovieAtom);
  const [, setIsFetching] = useAtom(isFetchingAtom);

  useEffect(() => {
    if (moviesType) {
      getMoviesByType({ moviesType })
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
  }, [moviesType]);

  return (
    <section className="px-8 py-4 relative">
      <h3 className="text-3xl text-white font-semibold mb-2">{title}</h3>
      <CarouselLayout>
        <EachUtils
          of={movieList}
          render={(item, index) => (
            <div
              className="carousel-item w-[63%] xs:w-[55%] md:w-[27%] lg:w-[20%] xl:w-1/6 px-0 sm:px-1"
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
                moviesType={moviesType}
              />
            </div>
          )}
        />
      </CarouselLayout>
    </section>
  );
};

export default MovieList;
