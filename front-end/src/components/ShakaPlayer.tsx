import { useRef, useState, useEffect, ReactChild } from "react";

import "shaka-player/dist/controls.css";
const shaka = require("shaka-player/dist/shaka-player.ui.js");

type ShakaPlayerProps = {
  children: ReactChild,
  url: string,
}

//Creating class component
function ShakaPlayer(props: ShakaPlayerProps){
  //Creating reference to store video component on DOM
  const videoComponent = useRef<HTMLVideoElement>(null);

  //Creating reference to store video container on DOM
  const videoContainer = useRef<HTMLDivElement>(null);

  const [player, setPlayer] = useState<any>(null);

  const { url } =  props;

  useEffect(() => {

    if( player !== null ){
      player.destroy();
    }

    const localVideoComponent = videoComponent?.current;
    const localVideoContainer = videoContainer?.current;

    const newPlayer = new shaka.Player(localVideoComponent); 
    setPlayer(newPlayer);

    const ui = new shaka.ui.Overlay(newPlayer, localVideoContainer, localVideoComponent);
    ui.getControls();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoComponent, videoContainer]);

  /*
  const config = {
      
  }
  useEffect(() => {
    if (player && config) {
      player.configure(config);
    }
  }, [player, config]);
  */

  // Load the source url when we have one.
  useEffect(() => {
    if (player && url) {
      player
      .load(url)
      .then(function() {
        // This runs if the asynchronous load is successful.
        console.log("The video has now been loaded!");
      })
      .catch(onError); 
    }
  }, [player, url]);


  const onError = (error: any) => {
    // Log the error.
    console.error("Error code", error.code, "object", error);
  }

  const onErrorEvent = (event: any) => {
    // Extract the shaka.util.Error object from the event.
    console.error(event.detail);
  }

  return (
    <div className="video-container" ref={videoContainer}>
      <video
        className="shaka-video"
        style={{
          maxWidth: '100%',
          width: '100%'
        }}
        autoPlay
        muted
        ref={videoComponent}
      />
    </div>
  )
}

export { ShakaPlayer }