import { Movie } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTredningMovies = async (): Promise<Movie[]> => {
  const { data } = await axios.get("/api/movies?trending=true");
  return data;
};

const useFetchTrendingMovies = () => {
  return useQuery({
    queryKey: ["trendingMovies"],
    queryFn: fetchTredningMovies,
  });
};
export default useFetchTrendingMovies;
