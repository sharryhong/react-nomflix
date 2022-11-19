import { IMovie } from "api";
import { makeImagePath } from "utils";
import styled from "styled-components";

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
const Overview = styled.p`
  padding: 0.7em;
  font-size: 0.9rem;
`;
interface IProps {
  id: string;
  selectedMovie?: IMovie;
}

function MovieDetail({ id, selectedMovie }: IProps) {
  return (
    <>
      {selectedMovie && (
        <>
          <Cover bgphoto={makeImagePath(selectedMovie.backdrop_path, "w500")} />
          <Title>{selectedMovie.title}</Title>
          <Overview>{selectedMovie.overview}</Overview>
        </>
      )}
    </>
  );
}

export default MovieDetail;
