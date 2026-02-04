import Image from "next/image";

const Background = () => {
  return (
    <>
        <Image src={"/images/alien_bg_red.jpg"} width={1920} height={1080} alt="background" className="bg" loading="eager"></Image>
    </>
  )
}

export default Background;