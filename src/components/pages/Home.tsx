import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getTopRatedMovies,
  getNowPlayingMovies,
  IGetMovieResult,
  IMovie,
  getPopularMovies,
  getUpcomingMovies,
} from "api";
import * as S from "styles/home";
import Loader from "../Loader";
import { makeImagePath } from "utils";
import Slider from "../Slider";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal";
import MovieDetail from "../MovieDetail";

function Home() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { data: nowPlayingData, isLoading } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getNowPlayingMovies
  );
  const { data: topRatedData } = useQuery<IGetMovieResult>(
    ["topRated"],
    getTopRatedMovies
  );
  const { data: popularData } = useQuery<IGetMovieResult>(
    ["popular"],
    getPopularMovies
  );
  const { data: upcomingData } = useQuery<IGetMovieResult>(
    ["upcoming"],
    getUpcomingMovies
  );

  const [selectedMovie, setSelectedMovie] = useState<IMovie>();
  const [selectedTitle, setSelectedTitle] = useState<string>();
  const selectMovie = (item: IMovie, title: string) => {
    navigate(`${process.env.PUBLIC_URL}/movies/${String(item.id)}`);
    setSelectedMovie(item);
    setSelectedTitle(title);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <S.Banner
            bgPhoto={makeImagePath(
              nowPlayingData?.results[0].backdrop_path || ""
            )}
          >
            <S.Title>{nowPlayingData?.results[0].title}</S.Title>
            <S.Overview>{nowPlayingData?.results[0].overview}</S.Overview>
          </S.Banner>
          <S.Container>
            {nowPlayingData && (
              <Slider
                title="Now Playing"
                movies={nowPlayingData?.results.slice(1)}
                selectMovie={selectMovie}
              />
            )}
            {popularData && (
              <Slider
                title="Popular"
                ranking
                movies={popularData?.results}
                selectMovie={selectMovie}
              />
            )}
            {upcomingData && (
              <Slider
                title="Upcoming"
                movies={upcomingData?.results}
                selectMovie={selectMovie}
              />
            )}
            {topRatedData && (
              <Slider
                title="Top Rated"
                ranking
                movies={topRatedData?.results}
                selectMovie={selectMovie}
              />
            )}
          </S.Container>
          {movieId && (
            <Modal isShow={!!movieId} id={`${selectedTitle}${movieId}`}>
              <MovieDetail id={movieId} selectedMovie={selectedMovie} />
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default Home;
