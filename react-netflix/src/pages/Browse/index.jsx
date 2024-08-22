import { useAtom } from "jotai";

import { searchMoviesAtom } from "@/jotai/atoms";
import BrowseLayout from "@layouts/BrowseLayout";
import Jumbotron from "@modules/BrowsePage/Jumbotron";
import MovieList from "@modules/BrowsePage/MovieList";
import Modal from "@modules/BrowsePage/Modal";
import SearchMovies from "@modules/BrowsePage/SearchMovies";
import Footer from "@/components/Modules/LandingPage/Footer";

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
