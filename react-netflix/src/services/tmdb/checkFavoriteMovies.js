import { apiInstanceExpress } from "@/services/express/apiInstance";

export const checkFavoriteMovies = async ({
  emailStorage,
  tokenStorage,
  idMovie,
}) => {
  try {
    const isFavorited = await apiInstanceExpress.post("my-movies/check", {
      email: emailStorage,
      token: tokenStorage,
      movie_id: idMovie,
    });

    if (isFavorited.status === 200) {
      return isFavorited.data.data.isFavorited;
    }
  } catch (error) {
    console.log(error);
  }
};
