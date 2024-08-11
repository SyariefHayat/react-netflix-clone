import { apiInstance } from "@/services/express/apiInstance";

export const getVideoUrl = async ({ movie_id }) => {
  const url = await apiInstance.get("movie/" + movie_id + "/videos");
  return url.data.results[0]?.key;
};
