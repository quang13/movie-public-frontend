import { TheosPlayer } from "@aka_theos/react-hls-player";

export default function HLSPlayerComponent({
  videoLink,
}: {
  videoLink: string;
}) {
  if (!videoLink) return null;
  return <div className="max-w-[980px] w-full">
    <TheosPlayer src={videoLink} width="100%" style={{aspectRatio: "16/9"}} height="360px" />
  </div>;
}
