import { useQuery } from "@tanstack/react-query";
import {
  getSearchMovies,
  getSearchMulti,
  getSearchTVs,
  IGetMovieResult,
  IMovie,
} from "api";
import Loader from "components/Loader";
import Modal from "components/Modal";
import MovieDetail from "components/MovieDetail";
import Slider from "components/Slider";
import { useCallback, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "utils";

const Container = styled.div`
  padding-top: 5em;
`;
const Keyword = styled.h2`
  margin: 1.2em 0.6em;
  color: ${(props) => props.theme.red};
`;
const Title = styled.strong`
  font-size: 1.5rem;
  margin: 0.6em;
`;
const Content = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
`;
const Multi = styled(motion.div)`
  position: relative;
  cursor: pointer;
`;
const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const MultiContent = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 20%;
  padding: 0.3em 0.5em;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: space-between;
  opacity: 0;
`;
const MultiTitle = styled.strong``;
const Description = styled.span`
  padding: 0.1em 0.2em;
  color: ${(props) => props.theme.red};
`;

const movieVariants = {
  hover: {
    y: -20,
    transition: { delay: 0.2, duration: 0.3, type: "tween" },
  },
};
const InfoVariant = {
  hover: {
    opacity: 1,
    transition: { delay: 0.2, duration: 0.3, type: "tween" },
  },
};

function Search() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const keyword = searchParams.get("keyword");

  const { data: movieData, isLoading } = useQuery<IGetMovieResult>(
    ["searchMovies", { keyword }],
    () => getSearchMovies(keyword || "")
  );
  const { data: tvData } = useQuery<IGetMovieResult>(
    ["searchTvs", { keyword }],
    () => getSearchTVs(keyword || "")
  );
  const { data: multiData } = useQuery<IGetMovieResult>(
    ["searchMulti", { keyword }],
    () => getSearchMulti(keyword || "")
  );
  const hasPoster = useCallback((data: IGetMovieResult) => {
    return data.results.filter(
      (item) => item.backdrop_path || item.poster_path
    );
  }, []);

  const [selectedMovie, setSelectedMovie] = useState<IMovie>();
  const [selectedTitle, setSelectedTitle] = useState<string>();
  const selectMovie = (item: IMovie, title: string) => {
    navigate(
      `${process.env.PUBLIC_URL}/search/${String(item.id)}?keyword=${keyword}`
    );
    setSelectedMovie(item);
    setSelectedTitle(title);
  };

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Keyword>
            Search Keyword: <strong>&lsquo;{keyword}&rsquo;</strong>
          </Keyword>
          {movieData && movieData.results.length ? (
            <Slider
              title="Movies"
              movies={hasPoster(movieData)}
              selectMovie={selectMovie}
            />
          ) : null}
          {tvData && tvData.results.length ? (
            <Slider
              title="TV Show"
              movies={hasPoster(tvData)}
              selectMovie={selectMovie}
            />
          ) : null}
          {multiData && multiData.results.length ? (
            <Content>
              <Title>Multi Search Result</Title>
              {hasPoster(multiData).map((item) => (
                <Multi
                  variants={movieVariants}
                  whileHover="hover"
                  key={item.id}
                  layoutId={`multi${item.id}`}
                  onClick={() => selectMovie(item, "multi")}
                >
                  <Img
                    src={makeImagePath(
                      item.poster_path || item.backdrop_path,
                      "w300"
                    )}
                  />
                  <MultiContent variants={InfoVariant}>
                    <MultiTitle>{item.title || item.name}</MultiTitle>
                    <Description>{item.media_type}</Description>
                  </MultiContent>
                </Multi>
              ))}
            </Content>
          ) : null}
          {id && (
            <Modal isShow={!!id} id={`${selectedTitle}${id}`}>
              <MovieDetail id={id} selectedMovie={selectedMovie} />
            </Modal>
          )}
        </>
      )}
    </Container>
  );
}

export default Search;
