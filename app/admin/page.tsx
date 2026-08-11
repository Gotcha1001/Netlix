"use client";
import { useGlobalContext } from "@/context/globalContext";
import React from "react";

const Page = () => {
  const { openModal } = useGlobalContext();

  return (
    <div>
      <button onClick={() => openModal("add-movie")}>Add Movie</button>
    </div>
  );
};

export default Page;
