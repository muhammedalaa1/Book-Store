import "swiper/css";
import "swiper/css/pagination";
import Featured from "./Featured/Featured";
import Books from "./Books/Books";
import { useEffect } from "react";
interface HomeProps {
  boxShadows: Record<string, string>;
  boxShadows1: Record<string, string>;
  font: Record<string, string>;
  handlePixelExtracted: (pixelData: number[], bookId: string) => void;
}

const Home: React.FC<HomeProps> = ({
  boxShadows,
  boxShadows1,
  font,
  handlePixelExtracted,
}) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <Featured
        boxShadows={boxShadows}
        font={font}
        handlePixelExtracted={handlePixelExtracted}
      />
      <Books boxShadows={boxShadows} boxShadows1={boxShadows1} />
    </>
  );
};

export default Home;
