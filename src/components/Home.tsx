import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies, IGetMovieResult } from "api";
import * as S from "styles/home";
import Loader from "./Loader";
import { makeImagePath } from "utils";

function Home() {
  const { data, isLoading } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

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
        </>
      )}
    </S.Container>
  );
}

export default Home;
