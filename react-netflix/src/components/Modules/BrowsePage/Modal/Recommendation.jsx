import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { GoPlay } from "react-icons/go";
import { useNavigate } from "react-router-dom";

import EachUtils from "@/utils/EachUtils";
import { getVideoUrl } from "@/services/tmdb/getVideoUrl";
import { idMovieAtom, isOpenModalAtom } from "@/jotai/atoms";
import { getMoviesRecommendation } from "@/services/tmdb/getMoviesRecommendation";

const Recommendation = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [moviesRecommendation, setMoviesRecommendation] = useState(null);

  const [, isOpenModal] = useAtom(isOpenModalAtom);
  const [idMovie, setIdMovie] = useAtom(idMovieAtom);

  const navigate = useNavigate();

  useEffect(() => {
    if (idMovie) {
      getMoviesRecommendation({ movie_id: idMovie }).then((result) =>
        setMoviesRecommendation(result)
      );
    }
  }, [idMovie]);

  return (
    <div className="px-4 py-2">
      <h2 className="text-2xl font-bold mt-4">Movies Recommendation</h2>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {moviesRecommendation && (
          <EachUtils
            of={moviesRecommendation}
            render={(item, index) => (
              <div
                key={index}
                onMouseEnter={() => {
                  getVideoUrl({ movie_id: item.id }).then((result) =>
                    setVideoUrl(result)
                  );
                }}
                className="w-full h-auto cursor-pointer rounded-md bg-[#141414]"
              >
                <div className="relative">
                  <img
                    src={
                      import.meta.env.VITE_BASE_URL_TMDB_IMAGE +
                      item.poster_path
                    }
                    alt=""
                    className="w-full max-h-72 object-cover rounded-t-md"
                  />
                  <button
                    className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                    onClick={() => {
                      navigate("/watch/" + videoUrl);
                      isOpenModal(false);
                      setIdMovie(null);
                    }}
                  >
                    <GoPlay size={44} />
                  </button>
                </div>
                <div className="p-2">
                  <p className="text-xl font-black text-white">{item.title}</p>
                  <p className="text-wrap pt-2 max-h-32 overflow-y-scroll">
                    {item.overview}
                  </p>
                </div>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Recommendation;
