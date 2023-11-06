import { FC } from "react";

type MusicPlayerBgProps = {
  fillColor: string;
  className: string;
}

const MusicPlayerBg:FC<MusicPlayerBgProps> = ({ fillColor, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1728 1080"
    fill="none"
    className={className}
  >
    <path d="M1728 0V579.389L1100.5 932.5L917.5 456L1728 0Z" fill="#307358" />
    <path
      d="M838.836 1080L781 887L385.5 887L318 1080H0L54.5 941.5L1728 0L1728 579.5L838.836 1080Z"
      fill={fillColor}
      fillOpacity={0.15}
    />
    <path
      d="M742.453 0L1157.07 1080H838.875L781.022 887.143H385.69L318.194 1080H0L424.259 0H742.453Z"
      fill="#0CB673"
      fillOpacity={0.3}
    />
  </svg>
);
export default MusicPlayerBg;
