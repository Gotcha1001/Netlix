// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const fetchFeaturedMovies = async () => {
//   const { data } = await axios.get("/api/movies?featured=true");
//   return data;
// };

// const useFetchFeaturedMovies = () => {
//   return useQuery({
//     queryKey: ["featured-movies"],
//     queryFn: fetchFeaturedMovies,
//   });
// };
// export default useFetchFeaturedMovies;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchFeaturedMovies = async () => {
  const { data } = await axios.get("/api/movies?featured=true");
  return data;
};

const useFetchFeaturedMovies = () => {
  return useQuery({
    queryKey: ["featured-movies"],
    queryFn: fetchFeaturedMovies,
    select: (movies) => {
      if (!movies?.length) return { movies, featured: null };
      const featured = movies[Math.floor(Math.random() * movies.length)];
      return { movies, featured };
    },
  });
};
export default useFetchFeaturedMovies;
