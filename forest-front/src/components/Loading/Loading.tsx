import Lottie from "react-lottie-player";

interface Iprops {
  width: number;
  height: number;
}

export default function Loading({ width, height }: Iprops) {
  return (
    <>
      <Lottie
        loop
        path="/lottieJson/loadingGreen.json"
        play
        style={{ width: `${width}rem`, height: `${height}rem`, margin: "auto" }}
      />
    </>
  );
}
