import { getDetailMovie, IMovie } from "api";
import { makeImagePath } from "utils";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

const Cover = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 280px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;
const Title = styled.h2`
  position: absolute;
  margin-left: 0.5em;
  top: 210px;
  font-size: 1.7rem;
`;
const Vote = styled.span`
  color: ${(props) => props.theme.yellow};
`;
const Info = styled.div`
  display: flex;
  padding: 0.8em 0.8em 0;
  font-size: 0.8rem;
  span + span:before {
    content: "|";
    margin: 0 0.5em;
    color: rgba(255, 255, 255, 0.5);
  }
`;
const Overview = styled.p`
  padding: 0.7em;
  line-height: 1.2;
`;
interface IProps {
  id: string;
  selectedMovie?: IMovie;
}

function MovieDetail({ id, selectedMovie }: IProps) {
  const { data } = useQuery<IMovie>(["movieDetail"], () => getDetailMovie(id));

  return (
    <>
      <Cover
        bgphoto={makeImagePath(
          selectedMovie
            ? selectedMovie.backdrop_path
            : data?.backdrop_path || "",
          "w500"
        )}
      />
      <Title>{selectedMovie ? selectedMovie.title : data?.title || ""}</Title>
      <Info>
        <span>
          {selectedMovie
            ? selectedMovie.release_date
            : data?.release_date || ""}
        </span>
        <Vote>
          {selectedMovie
            ? selectedMovie.vote_average.toFixed(1)
            : data?.vote_average.toFixed(1) || ""}
        </Vote>
      </Info>
      <Overview>
        {selectedMovie ? selectedMovie.overview : data?.overview || ""}
      </Overview>
    </>
  );
}

export default MovieDetail;
