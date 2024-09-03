import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";

import BrowseLayout from "@layouts/BrowseLayout";
import Modal from "@modules/BrowsePage/Modal";
import MovieCard from "@modules/BrowsePage/MovieCard";
import {
  emailStorageAtom,
  idMovieAtom,
  isFavoritedAtom,
  tokenStorageAtom,
} from "@/jotai/atoms";
import EachUtils from "@/utils/EachUtils";
import { apiInstanceExpress } from "@/services/express/apiInstance";

const Favorite = () => {
  const [isHover, setIsHover] = useState(false);
  const [movieList, setMovieList] = useState([]);

  const [tokenStorage] = useAtom(tokenStorageAtom);
  const [emailStorage] = useAtom(emailStorageAtom);

  const [, setIdMovie] = useAtom(idMovieAtom);
  const [isFavorited] = useAtom(isFavoritedAtom);

  const getFavoriteMovies = async () => {
    try {
      const url = `my-movies/${emailStorage}/${tokenStorage}`;
      const movies = await apiInstanceExpress.get(url);

      if (movies.status === 200) return movies.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    if (emailStorage && tokenStorage) {
      getFavoriteMovies().then((result) =>
        setMovieList(result.data.favoriteMovies)
      );
    }
  }, [emailStorage, tokenStorage, isFavorited]);

  return (
    <BrowseLayout>
      <div className="mt-20 px-8">
        <h3 className="text-white font-bold text-2xl">My Favorite Movies</h3>
        {movieList.length === 0 && <p>Belum ada favorite movies saat ini</p>}
      </div>
      <div className="grid grid-cols-6 gap-4 p-8">
        <EachUtils
          of={movieList}
          render={(item, index) => (
            <div
              key={index}
              className="max-h-72 cursor-pointer object-cover rounded-xl mb-5"
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
      </div>
      <Modal />
    </BrowseLayout>
  );
};

export default Favorite;
