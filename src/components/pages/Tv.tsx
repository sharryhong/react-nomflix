import { useQuery } from "@tanstack/react-query";
import {
  IGetMovieResult,
  getOnTheAirTVs,
  IMovie,
  getPopularTVs,
  getTopRatedTVs,
  getAiringTodayTVs,
} from "api";
import * as S from "styles/home";
import Slider from "../Slider";
import Loader from "../Loader";
import { makeImagePath } from "utils";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal";
import TvDetail from "../TvDetail";

function Tv() {
  const navigate = useNavigate();
  const { tvId } = useParams();

  const { data: onTheAirData, isLoading } = useQuery<IGetMovieResult>(
    ["onTheAir"],
    getOnTheAirTVs
  );
  const { data: popularData } = useQuery<IGetMovieResult>(
    ["popularTv"],
    getPopularTVs
  );
  const { data: topRatedData } = useQuery<IGetMovieResult>(
    ["topRatedTV"],
    getTopRatedTVs
  );
  const { data: airingTodayData } = useQuery<IGetMovieResult>(
    ["airingToday"],
    getAiringTodayTVs
  );

  const [selectedMovie, setSelectedMovie] = useState<IMovie>();
  const [selectedTitle, setSelectedTitle] = useState<string>();
  const selectMovie = (item: IMovie, title: string) => {
    navigate(`${process.env.PUBLIC_URL}/tv/${String(item.id)}`);
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
              onTheAirData?.results[0].backdrop_path || ""
            )}
          >
            <S.Title>{onTheAirData?.results[0].name}</S.Title>
            <S.Overview>{onTheAirData?.results[0].overview}</S.Overview>
          </S.Banner>
          <S.Container>
            {onTheAirData && (
              <Slider
                title="On The Air"
                movies={onTheAirData?.results.slice(1)}
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
            {airingTodayData && (
              <Slider
                title="Airing Today"
                movies={airingTodayData?.results}
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
          {tvId && (
            <Modal isShow={!!tvId} id={`${selectedTitle}${tvId}`}>
              <TvDetail id={tvId} selectedMovie={selectedMovie} />
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default Tv;
