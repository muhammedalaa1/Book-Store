import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import "swiper/css";
import "swiper/css/pagination";
import Featured from "./Featured/Featured";
import Books from "./Books/Books";
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
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <Featured
        boxShadows={boxShadows}
        font={font}
        handlePixelExtracted={handlePixelExtracted}
      />
      <Books boxShadows={boxShadows} boxShadows1={boxShadows1} />
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Home;
