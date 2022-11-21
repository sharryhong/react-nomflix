const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

interface IGenres {
  id: number;
  name: string;
}
export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  popularity?: number;
  title?: string;
  release_date?: string;
  name?: string;
  first_air_date?: string;
  media_type?: string;
  genres?: IGenres[];
  origin_country?: string[];
  original_language?: string;
}

export interface IGetMovieResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
}

export const getNowPlayingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
  );
  return await response.json();
};
export const getTopRatedMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );
  return await response.json();
};
export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  return await response.json();
};
export const getUpcomingMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  return await response.json();
};
export const getDetailMovie = async (id: string) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return await response.json();
};

export const getOnTheAirTVs = async () => {
  const response = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`);
  return await response.json();
};
export const getPopularTVs = async () => {
  const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
  return await response.json();
};
export const getTopRatedTVs = async () => {
  const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
  return await response.json();
};
export const getAiringTodayTVs = async () => {
  const response = await fetch(
    `${BASE_URL}/tv/airing_today?api_key=${API_KEY}`
  );
  return await response.json();
};
export const getDetailTv = async (id: string) => {
  const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  return await response.json();
};

export const getSearchMovies = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return await response.json();
};
export const getSearchTVs = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`
  );
  return await response.json();
};
export const getSearchMulti = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
  );
  return await response.json();
};
