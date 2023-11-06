import MusicPlayerBg from "./components/music-player-bg";
import Player from "./components/music-player";

import styles from "./MusicPlayer.module.scss";

const MusicPlayer = () => {
  return <div className={styles.musicPlayer}>
    <MusicPlayerBg fillColor="#05AC6A" className={styles.musicPlayerBg}/>
    <Player/>
  </div>
}

export default MusicPlayer;
