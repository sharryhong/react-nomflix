import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNowPlayingMovies, IGetMovieResult, IMovie } from "api";
import * as S from "styles/home";
import Loader from "./Loader";
import { makeImagePath } from "utils";
import Slider from "./Slider";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import MovieDetail from "./MovieDetail";

function Home() {
  const { movieId } = useParams();
  const { data, isLoading } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getNowPlayingMovies
  );
  const [selectedMovie, setSelectedMovie] = useState<IMovie>();
  const selectMovie = (item: IMovie) => {
    setSelectedMovie(item);
  };

  return (
    <S.Container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <S.Banner
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <S.Title>{data?.results[0].title}</S.Title>
            <S.Overview>{data?.results[0].overview}</S.Overview>
          </S.Banner>
          {data && (
            <Slider
              title="Now Playing"
              movies={data?.results.slice(1)}
              selectMovie={selectMovie}
            />
          )}
          {movieId && (
            <Modal isShow={!!movieId} id={movieId}>
              <MovieDetail id={movieId} selectedMovie={selectedMovie} />
            </Modal>
          )}
        </>
      )}
    </S.Container>
  );
}

export default Home;
