import React, { useState } from "react";
import { useAtom } from "jotai";
import { GoSearch } from "react-icons/go";
import { AnimatePresence, motion } from "framer-motion";

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
      <motion.div
        initial={{ width: "2.5rem", height: "2.5rem" }}
        animate={
          isShown
            ? { width: "200px", opacity: 1 }
            : {
                width: "2.5rem",
                height: "2.5rem",
              }
        }
        transition={
          isShown
            ? { duration: 0.3, ease: "easeInOut" }
            : { duration: 1, ease: "easeInOut" }
        }
        className="relative bg-black z-10 rounded-full overflow-hidden "
      >
        <GoSearch
          onClick={() => setIsShown(!isShown)}
          className={`absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer z-10`}
          size={24}
        />
        <AnimatePresence>
          {isShown && (
            <motion.input
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "200px", opacity: 1, paddingLeft: "2.5rem" }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="bg-black outline-none py-2 "
              placeholder="title, people, genres..."
              onChange={handleChange}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default InputSearchMovies;
