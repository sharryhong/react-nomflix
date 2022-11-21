import { getDetailTv, IMovie } from "api";
import { useQuery } from "@tanstack/react-query";
import Detail from "./Detail";

interface IProps {
  id: string;
  selectedMovie?: IMovie;
}

function TvDetail({ id, selectedMovie }: IProps) {
  const { data } = useQuery<IMovie>(["tvDetail"], () => getDetailTv(id));

  return (
    <Detail
      photo={
        selectedMovie ? selectedMovie.backdrop_path : data?.backdrop_path || ""
      }
      title={selectedMovie ? selectedMovie.name : data?.name || ""}
      date={
        selectedMovie
          ? selectedMovie.first_air_date
          : data?.first_air_date || ""
      }
      voteAverage={
        selectedMovie
          ? selectedMovie.vote_average.toFixed(1)
          : data?.vote_average.toFixed(1) || ""
      }
      overview={selectedMovie ? selectedMovie.overview : data?.overview || ""}
    />
  );
}

export default TvDetail;
