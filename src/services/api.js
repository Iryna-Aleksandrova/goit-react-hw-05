import axios from "axios";

const URL = "https://api.themoviedb.org/3/";
const Token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDg3NmU5ZGI3NjIxODU3ZjY5NTZlZjMyMTg5MTk2ZCIsIm5iZiI6MTczODg2NjI2MS4wMzMsInN1YiI6IjY3YTRmZTU1ZGYzMzZmMzhhYjg1Y2I1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d7-pzosaBv2BZX1XXZGMfb8oBmbsEJXLhxSsT20Z4gU";

axios.defaults.baseURL = URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
axios.defaults.headers.common["accept"] = "application/json";

export const fetchTrendingMovies = async () => {
  const response = await axios("trending/movie/week");
  return response.data;
};

export const fetchSearchMovie = async (query) => {
  const response = await axios.get("search/movie", {
    params: {
      query,
    },
  });
  return response.data;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`movie/${id}`);
  return response.data;
};

export const fetchMovieCredits = async (id) => {
  const response = await axios.get(`movie/${id}/credits`);
  return response.data;
};

export const fetchMovieReviews = async (id) => {
  const response = await axios.get(`movie/${id}/reviews`);
  return response.data;
};
