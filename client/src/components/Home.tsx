import "swiper/css";
import "swiper/css/pagination";
import Featured from "./Featured/Featured";
import Books from "./Books/Books";
import { useEffect } from "react";
const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <Featured />
      <Books />
    </>
  );
};

export default Home;
