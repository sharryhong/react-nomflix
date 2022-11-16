import { useQuery } from "@tanstack/react-query";
import { getMovies } from "api";
import React from "react";
import * as S from "styles/home";

function Home() {
  const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);
  console.log(data, isLoading);

  return <S.Container>Home</S.Container>;
}

export default Home;
