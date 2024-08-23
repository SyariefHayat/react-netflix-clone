import React from "react";
import { useAtom } from "jotai";

import Modal from "@modules/BrowsePage/Modal";
import { searchMoviesAtom } from "@/jotai/atoms";
import BrowseLayout from "@layouts/BrowseLayout";
import Footer from "@modules/LandingPage/Footer";
import Jumbotron from "@modules/BrowsePage/Jumbotron";
import MovieList from "@modules/BrowsePage/MovieList";
import SearchMovies from "@modules/BrowsePage/SearchMovies";

function Browse() {
  const [searchQuery] = useAtom(searchMoviesAtom);

  return (
    <BrowseLayout>
      {searchQuery ? (
        <SearchMovies />
      ) : (
        <>
          <Jumbotron />
          <MovieList title={"Popular Movies"} moviesType={"popular"} />
          <MovieList title={"Top Related Movies"} moviesType={"top_rated"} />
          <MovieList title={"Upcoming Movies"} moviesType={"upcoming"} />
        </>
      )}
      <Footer />
      <Modal />
    </BrowseLayout>
  );
}

export default Browse;
