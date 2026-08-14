// "use client";
// import { createPlayer, videoFeatures, Container } from "@videojs/react";
// import { Video } from "@videojs/react/video";
// import VideoControls from "./VideoControls";

// interface ThumbnailEntry {
//   url: string;
//   startTime: number;
//   endTime: number;
// }

// interface MyPlayerProps {
//   src: string;
//   title: string;
//   thumbnails: ThumbnailEntry[];
// }

// const Player = createPlayer({ features: videoFeatures });

// function MyPlayer({ src, title, thumbnails }: MyPlayerProps) {
//   return (
//     <Player.Provider>
//       <Container className="relative h-screen w-full flex items-center justify-center bg-black">
//         <Video
//           src={src}
//           autoPlay
//           muted
//           className="video-element h-full w-full object-contain"
//         />
//         <VideoControls thumbnails={thumbnails} title={title} />
//       </Container>
//     </Player.Provider>
//   );
// }

// export default MyPlayer;
"use client";
import { createPlayer, videoFeatures, Container } from "@videojs/react";
import { Video } from "@videojs/react/video";
import VideoControls from "./VideoControls";

interface ThumbnailEntry {
  url: string;
  startTime: number;
  endTime: number;
}

interface MyPlayerProps {
  src: string;
  title: string;
  thumbnails: ThumbnailEntry[];
  captionsSrc?: string; // path to your .vtt file
}

const Player = createPlayer({ features: videoFeatures });

function MyPlayer({
  src,
  title,
  thumbnails,
  captionsSrc = "/captions/en.vtt", // change to your real VTT path
}: MyPlayerProps) {
  return (
    <Player.Provider>
      <Container className="relative h-screen w-full flex items-center justify-center bg-black">
        <Video
          src={src}
          autoPlay
          muted
          playsInline
          crossOrigin="anonymous" // required if the VTT is on another domain
          className="video-element h-full w-full object-contain"
        >
          {/* This is what makes captions work */}
          <track
            kind="captions"
            src={captionsSrc}
            srcLang="en"
            label="English"
            // default  // uncomment if you want captions on by default
          />
        </Video>

        <VideoControls thumbnails={thumbnails} title={title} />
      </Container>
    </Player.Provider>
  );
}

export default MyPlayer;
