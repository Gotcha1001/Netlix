import Image from "next/image";
import React from "react";

function Background() {
  return (
    <div className="absolute inset-0 h-full w-full -z-10">
      <div className="overlay absolute inset-0 bg-black/60"></div>
      <Image
        src="/images/bg--login.png"
        alt="Background Image"
        width={1500}
        height={1400}
        className="object-cover h-full w-full"
      />
    </div>
  );
}

export default Background;
