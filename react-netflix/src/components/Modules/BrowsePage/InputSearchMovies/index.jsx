import React, { useState } from "react";
import { useAtom } from "jotai";
import { motion } from "framer-motion";
import { GoSearch } from "react-icons/go";

import { searchMoviesAtom } from "@/jotai/atoms";

const InputSearchMovies = () => {
  const [isShown, setIsShown] = useState(false);
  const [, setSearchMovies] = useAtom(searchMoviesAtom);

  const handleChange = (e) => {
    if (e.target.value.length > 3) {
      setSearchMovies(e.target.value);
    } else {
      setSearchMovies(null);
    }
  };
  return (
    <div className="relative">
      <motion.input
        initial={{ translateX: -20 }}
        animate={{ translateX: isShown ? 0 : -20 }}
        className="bg-black border py-2 pl-12"
        style={{ display: isShown ? "block" : "none" }}
        placeholder="title, people, genres..."
        onChange={handleChange}
      />
      <GoSearch
        onClick={() => setIsShown(!isShown)}
        className={`${
          isShown ? "absolute top-1/2 -translate-y-1/2 left-3 z-10" : ""
        }`}
        size={24}
      />
    </div>
  );
};

export default InputSearchMovies;
