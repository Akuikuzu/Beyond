
import { X } from "lucide-react";
import { useEffect } from "react";

type Props = { onClose: () => void };
const Video = ({ onClose }: Props ) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 7500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      <div id="modal">
        <div className="close">
          <X onClick={onClose}></X>
        </div>

        <video width={400} height={800} autoPlay muted id="video">
            <source src="/video/video.mp4"/>
        </video>

      </div>
    </>
  );
};

export default Video;
