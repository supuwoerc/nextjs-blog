import React from 'react';

interface VideoProps extends React.HTMLProps<HTMLVideoElement> {}
const Video: React.FC<VideoProps> = ({
  controls = true,
  width = 320,
  height = 240,
  preload = 'one',
  src,
  kind = 'subtitles',
  type = 'video/mp4',
  loop = false,
  muted = true,
  autoPlay = false,
}) => {
  return (
    <video
      width={width}
      height={height}
      controls={controls}
      preload={preload}
      loop={loop}
      muted={muted}
      autoPlay={autoPlay}
    >
      <source src={src} type={type} />
      <track src={src} kind={kind} />
    </video>
  );
};
export default Video;
