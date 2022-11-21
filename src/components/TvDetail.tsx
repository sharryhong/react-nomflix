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
        selectedMovie
          ? selectedMovie.backdrop_path || selectedMovie.poster_path
          : data?.backdrop_path || data?.poster_path || ""
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
      genres={data?.genres?.map((item) => item.name).join(", ")}
      country={
        data?.origin_country?.length
          ? data?.origin_country?.join(", ")
          : data?.original_language
      }
    />
  );
}

export default TvDetail;
