import React from "react";

export default function IframePlayerComponent({ videoLink }: { videoLink: string }) {
  if (!videoLink) return null;
  return (
    <div className="normal-player-iframe w-full max-w-[980px]">
      <iframe
        width="100%"
        height="100%"
        src={videoLink}
        title="video"
        allowFullScreen
        style={{ aspectRatio: "16/9" }}
      />
    </div>
  );
}
