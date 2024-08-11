import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { GoPlay, GoMute, GoUnmute } from "react-icons/go";

import { getVideoUrl } from "@/services/tmdb/getVideoUrl";
import { idMovieAtom, isOpenModalAtom } from "@/jotai/atoms";
import { getMoviesByType } from "@/services/tmdb/getMoviesByType";

const Jumbotron = () => {
  const [idMovie, setIdMovie] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [topMovies, setTopMovies] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  const [, setIdMovieAtom] = useAtom(idMovieAtom);
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);

  const navigate = useNavigate();

  useEffect(() => {
    getMoviesByType({ moviesType: "top_rated" }).then((result) => {
      setTopMovies(result[0]);
      setIdMovie(result[0].id);
    });
  }, []);

  useEffect(() => {
    if (idMovie) {
      getVideoUrl({ movie_id: idMovie }).then((result) => setVideoUrl(result));
    }
  }, [idMovie]);

  return (
    <div className="relative h-[500px] w-full">
      <ReactPlayer
        url={"https://www.youtube.com/watch?v=" + videoUrl}
        width={"100%"}
        height={"700px"}
        playing={true}
        muted={isMuted}
        controls={false}
        style={{ opacity: "75%" }}
      />
      <div className="absolute top-1/2 -translate-y-1/2 left-0 p-8 max-w-xl">
        <div className="flex flex-col gap-4 text-white">
          <h1 className="text-3xl sm:text-5xl font-black">{topMovies.title}</h1>
          <p className="hidden lg:block">{topMovies.overview}</p>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className="bg-gray-200 py-2 px-8 rounded-md text-xl font-bold text-black flex items-center gap-1"
            onClick={() => {
              navigate("/watch/" + videoUrl);
              setIsMuted(true);
            }}
          >
            <GoPlay /> Play
          </button>
          <button
            className="bg-stone-600/80 py-2 px-8 rounded-md text-white"
            onClick={() => {
              setIdMovieAtom(idMovie);
              setIsOpenModal(true);
            }}
          >
            More Detail
          </button>
        </div>
      </div>
      <div className="absolute right-6 bottom-1/2 -translate-y-1/2 text-white">
        <div
          className="border rounded-full p-2 cursor-pointer"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <GoMute size={24} /> : <GoUnmute size={24} />}
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
