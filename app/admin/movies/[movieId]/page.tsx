"use client";
import FormMovieUpdate from "@/components/movie/FormMovieUpdate";
import useFetchMovie from "@/hooks/movie/useFetchMovie";
import useUpdateMovie from "@/hooks/useUpdateMovie";
import { MovieUpdateData } from "@/types/types";
import React from "react";

interface Props {
  params: Promise<{ movieId: string }>;
}

const Page = ({ params }: Props) => {
  const { movieId } = React.use(params);
  const { mutate: updateMovie } = useUpdateMovie();
  const { data: movie, isLoading } = useFetchMovie(movieId);

  const handleMovieUpdate = (data: MovieUpdateData) => {
    const { releaseYear, rating, ...rest } = data;

    updateMovie({
      id: movieId,
      ...rest,
      ...(releaseYear !== undefined && { releaseYear: Number(releaseYear) }),
      ...(rating !== undefined && { maturityRating: rating }),
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <FormMovieUpdate handleSubmit={handleMovieUpdate} movie={movie} />
    </div>
  );
};

export default Page;
