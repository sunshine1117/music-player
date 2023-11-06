import { useEffect, useRef, useState } from "react";
import Button from "../../../../components/button";
import Disk from "../../../../assets/images/disk.png";
import { PauseStream, PauseStreamFilled, RewindBack, RewindNext, VolumeCross, VolumeLoud } from "../../../../assets/images";
import { MAX_VOLUME, MIN_VOLUME } from "./constants";

import audios from "../../../../assets/musics";

import styles from "./Player.module.scss";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(MIN_VOLUME);
  const [volume, setVolume] = useState<number>(0.5);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState<number>(MIN_VOLUME);
  const audio = useRef<HTMLAudioElement | null>(null);

  const currentAudio = audios[currentAudioIndex]

  let progressWidth;
  const volumeStyle = `linear-gradient(90deg, #05AC6A ${(isMuted ? MIN_VOLUME : volume) * 100}%, #C5C6C5 ${(isMuted ? MIN_VOLUME : volume) * 100}%)`;

  if (audio.current) {
    progressWidth = (currentTime / audio.current.duration) * 100;
  }

  const playPauseToggle = () => {
    if (audio.current) {
      if (isPlaying) {
        audio.current.pause();
      } else {
        audio.current.play();
      }
    }

    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handlePrevious = () => {
    setCurrentAudioIndex(prevAudioIndex => {
      if (prevAudioIndex === 0) {
        return audios.length - 1;
      } else {
        return prevAudioIndex - 1;
      }
    });
  };

  const handleNext = () => {
    setCurrentAudioIndex(prevAudioIndex => {
      if (prevAudioIndex === audios.length - 1) {
        return 0;
      } else {
        return prevAudioIndex + 1;
      }
    });
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (audio.current) {
      audio.current.volume = newVolume
    }
    setIsMuted(false);
    setVolume(newVolume);
  };

  const toggleMute = () => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
  };

  const setMaxVolume = () => {
    setVolume(MAX_VOLUME);
    setIsMuted(false);
  };

  const handleProgressChange = (event: React.MouseEvent<HTMLDivElement>) => {
    if (audio.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const width = rect.right - rect.left;
      const seekTime = (x / width) * audio.current.duration;
      audio.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  }

  const handleTimeUpdate = () => {
    audio.current && setCurrentTime(audio.current.currentTime);
  };

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = isMuted ? MIN_VOLUME : volume;
    }
  }, [isMuted, volume])

  useEffect(() => {
    if (audio.current) {
      isPlaying && audio.current.play();
    }
  }, [currentAudioIndex, currentAudio.url, isPlaying]);

  useEffect(() => {
    const currentAudio = audio.current;
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className={styles.player}>
      <audio
        ref={audio}
        src={currentAudio.url}
        onTimeUpdate={handleTimeUpdate}
      ></audio>
      <div className={styles.controls}>
        <Button className={`${styles.rewindButton} ${styles.controlButton}`} icon={RewindBack} onClick={handlePrevious} />
        <Button className={`${styles.playButton} ${styles.controlButton}`} icon={isPlaying ? PauseStreamFilled : PauseStream} onClick={playPauseToggle} />
        <Button className={`${styles.rewindButton} ${styles.controlButton}`} icon={RewindNext} onClick={handleNext} />
      </div>
      <div>
        <div className={styles.volumeControl}>
          <Button className={styles.volumeButton} icon={VolumeCross} onClick={toggleMute} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? MIN_VOLUME : volume}
            onChange={handleVolumeChange}
            className={styles.volume}
            style={{ background: volumeStyle }}
          />
          <Button className={styles.volumeButton} icon={VolumeLoud} onClick={setMaxVolume} />
        </div>
        {isPlaying && <div className={styles.name}>Now Playing: {currentAudio.name}</div>}
        {isPlaying && <div className={styles.progressBar} onClick={handleProgressChange}>
          <div className={styles.progress} style={{ width: `${progressWidth}%` }}></div>
        </div>}
      </div>
      <div className={`${styles.disk} ${isPlaying ? styles.diskRotate : ""}`}>
        <img src={Disk} alt="disk" />
      </div>
    </div>
  );
};

export default Player;
