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
const Star = styled.svg`
  width: 12px;
  height: 12px;
  fill: ${(props) => props.theme.yellow};
  margin-right: 3px;
`;
const Vote = styled.span`
  color: ${(props) => props.theme.yellow};
`;
const Info = styled.div`
  display: flex;
  padding: 0.8em 0.8em 0;
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
  photo: string;
  title?: string;
  date?: string;
  voteAverage?: string;
  overview: string;
  genres?: string;
  country?: string;
}

function Detail({
  photo,
  title,
  date,
  voteAverage,
  overview,
  genres,
  country,
}: IProps) {
  return (
    <>
      <Cover bgphoto={makeImagePath(photo, "w500")} />
      <Title>{title}</Title>
      <Info>
        <span>{date}</span>
        <span>{country}</span>
        <Vote>
          <Star xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </Star>
          {voteAverage}
        </Vote>
      </Info>
      {genres && <Info>Genres: {genres}</Info>}
      <Overview>{overview}</Overview>
    </>
  );
}

export default Detail;
