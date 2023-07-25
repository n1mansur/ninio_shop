import React from 'react'
import YouTube from 'react-youtube';
import styles from './styles.module.scss'

export default function YoutubePlayer({ videoId }) {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const onReady = (event) => {
    event.target.playVideo();
  };
  return <YouTube className={styles.YouTube} videoId={videoId} opts={opts} onReady={onReady} />;

}
