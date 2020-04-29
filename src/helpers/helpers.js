export const fetchMovie = (url, page) => {
  const apiKey = "de07f91995468df88c575bd654d42bba";

  return fetch(
    `https://api.themoviedb.org/3/${url}api_key=${apiKey}&language=en-US${page}&include_adult=false`
  ).then((response) => response.json());
};
