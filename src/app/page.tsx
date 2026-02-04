"use client"
import { useState } from "react";
import Video from "@/components/Video";
import Shell from "@/components/Shell";
import ModalClosed from "@/components/ModalClosed";

type Content = number | null;

export default function Home() {
  const [showVideo, setShowVideo] = useState(true);
  const [showContent, setShowContent] = useState<Content>(null);

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  const handleContent = (mode: Content) => {
    setShowContent(mode);
  };

  const handleClose = () => setShowContent(null);

  const isModalClosedVisible = !showVideo && showContent === null;

  return (
    <>
    <Shell onToggleContent={handleContent} activeIndex={showContent} onClose={handleClose} />
    {showVideo && <Video onClose={handleCloseVideo}></Video>}
    {isModalClosedVisible && <ModalClosed></ModalClosed>}
    </>
  );
}
