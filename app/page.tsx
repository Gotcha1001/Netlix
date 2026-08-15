"use client";
import Header from "@/components/Header";
import MaturityBadge from "@/components/movie/MaturityBadge";
import MoviesRow from "@/components/movie/MoviesRow";
import { useGlobalContext } from "@/context/globalContext";
import useFetchFeaturedMovies from "@/hooks/movie/useFetchFeaturedMovies";
import useFetchMovies from "@/hooks/movie/useFetchMovies";
import useFetchTrendingMovies from "@/hooks/movie/useFetchTrendingMovies";
import { InfoIcon, PlayIcon, VolumeFullIcon, VolumeOffIcon } from "@/lib/icons";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Home() {
  const router = useRouter();

  const { openModal } = useGlobalContext();

  const { data: featuredMovies } = useFetchFeaturedMovies();

  const { data: allMovies = [], isLoading: allMoviesLoading } =
    useFetchMovies();
  // const { data: myListMovies = [] } = useFetchMyListMovies();

  const { data: trendingMovies = [], isLoading: trendingLoading } =
    useFetchTrendingMovies();
  const { data: featureMovies, isLoading: featuredLoading } =
    useFetchFeaturedMovies();

  const [isMuted, setIsMuted] = useState(true);

  const featured = featuredMovies?.[0];

  // const dummyData = Array(10).fill(featured || null);

  if (featuredLoading || allMoviesLoading || trendingLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-blue-500 animate-spin fill-brand"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Header />
      <div className="relative w-full -mt-17.5">
        <video
          autoPlay
          loop
          muted={isMuted}
          src={featured?.videoUrl ?? undefined}
          className="w-full aspect-video"
        ></video>

        <div className="absolute right-0 bottom-[25%] md:bottom-[30%] flex gap-3 items-center">
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className="w-8 h-8 md:h-11 md:w-11 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white cursor-pointer"
          >
            {isMuted ? (
              <VolumeOffIcon size={22} />
            ) : (
              <VolumeFullIcon size={22} />
            )}
          </button>
          <div className="pr-8 md:pr-16 pl-4 bg-black/50 border-l-3 border-white/80 ">
            <MaturityBadge rating={featured?.maturityRating} />
          </div>
        </div>
        <div className="absolute left-4 md:left-14 bottom-[25%] md:bottom-[30%] max-w-[55%] md:max-w-lg">
          <div className="flex flex-col gap-2 md:gap-6">
            <h1 className="u-text-shadow font-bold text-xl md:text-3xl">
              {featured?.title}
            </h1>
            <p className="u-text-shadow text-sm md:text-xl font-medium hidden lg:block">
              {featured?.description.substring(0, 120)}...
            </p>

            <div>
              <div className="flex items-center gap-2 md:gap-4">
                <button
                  className="btn-play"
                  onClick={() => {
                    router.push(`/watch/${featured?.publicId}`);
                  }}
                >
                  <PlayIcon size={28} /> Play
                </button>
                <button
                  className="btn-info"
                  onClick={() => featured && openModal("movie-info", featured)}
                >
                  <InfoIcon size={28} /> More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="-mt-26 md:-mt-32 overflow-x-clip pt-8 px-4 md:px-14 relative z-20 flex flex-col gap-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-brand-background) 10rem)",
        }}
      >
        <MoviesRow title="Trending Now" movies={trendingMovies} />
        <MoviesRow title="New on Netflix" movies={trendingMovies} />
        <MoviesRow title="My List" movies={trendingMovies} />
      </div>
    </div>
  );
}
