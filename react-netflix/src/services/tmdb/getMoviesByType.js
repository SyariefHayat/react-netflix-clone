import { apiInstance } from "@/services/express/apiInstance";

export const getMoviesByType = async ({ moviesType }) => {
  try {
    let movies = await apiInstance.get("movie/" + moviesType);
    return movies.data.results;
  } catch (error) {
    console.log(error);
  }
};
