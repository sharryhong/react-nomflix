import { useQuery } from "@tanstack/react-query";
import { IGetMovieResult, getOnTheAirTVs, IMovie } from "api";
import * as S from "styles/home";
import Slider from "./Slider";
import Loader from "./Loader";
import { makeImagePath } from "utils";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import TvDetail from "./TvDetail";

function Tv() {
  const { tvId } = useParams();
  const { data: onTheAirData, isLoading } = useQuery<IGetMovieResult>(
    ["onTheAir"],
    getOnTheAirTVs
  );
  console.log(onTheAirData);

  const [selectedMovie, setSelectedMovie] = useState<IMovie>();
  const [selectedTitle, setSelectedTitle] = useState<string>();
  const selectMovie = (item: IMovie, title: string) => {
    setSelectedMovie(item);
    setSelectedTitle(title);
  };

  return (
    <S.Container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <S.Banner
            bgPhoto={makeImagePath(
              onTheAirData?.results[0].backdrop_path || ""
            )}
          >
            <S.Title>{onTheAirData?.results[0].name}</S.Title>
            <S.Overview>{onTheAirData?.results[0].overview}</S.Overview>
          </S.Banner>
          {onTheAirData && (
            <Slider
              title="On The Air"
              tvShow
              movies={onTheAirData?.results.slice(1)}
              selectMovie={selectMovie}
            />
          )}
          {tvId && (
            <Modal isShow={!!tvId} id={`${selectedTitle}${tvId}`}>
              <TvDetail id={tvId} selectedMovie={selectedMovie} />
            </Modal>
          )}
        </>
      )}
    </S.Container>
  );
}

export default Tv;
