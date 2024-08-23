import { useEffect, useState } from "react";

import { genreMapping } from "@/utils/genreMapping";
import { getVideoUrl } from "@/services/tmdb/getVideoUrl";
import { getMovieDetail } from "@/services/tmdb/getMovieDetail";

const useMovieDetail = (idMovie) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [movieGenres, setMovieGenres] = useState([]);
  const [detailMovie, setDetailMovie] = useState([]);

  useEffect(() => {
    if (idMovie) {
      getVideoUrl({ movie_id: idMovie }).then((result) => setVideoUrl(result));

      getMovieDetail({ movie_id: idMovie }).then((result) => {
        setDetailMovie(result);
        setMovieGenres(genreMapping(result.genres, " | "));
      });
    }
  }, [idMovie]);

  return { videoUrl, movieGenres, detailMovie };
};

export default useMovieDetail;
