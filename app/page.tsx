"use client";
import Header from "@/components/Header";
import MaturityBadge from "@/components/movie/MaturityBadge";
import { useGlobalContext } from "@/context/globalContext";
import useFetchFeaturedMovies from "@/hooks/movie/useFetchFeaturedMovies";
import useFetchMovies from "@/hooks/movie/useFetchMovies";
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
  // const { data: trendingMovies = [], isLoading: trendingLoading } =
  //   useFetchTrendingMovies();

  const [isMuted, setIsMuted] = useState(true);

  const featured = featuredMovies?.[0];

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
    </div>
  );
}
