export const genreMapping = (genres, separator) => {
  if (genres) {
    let result = "";
    genres.map((genre, index) => {
      if (index === genres.length - 1) {
        result += genre.name;
      } else {
        result += genre.name + separator;
      }
    });
    return result;
  }
};
