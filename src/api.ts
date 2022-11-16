const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}
export interface IGetMovieResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
}

export const getMovies = () => {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};
