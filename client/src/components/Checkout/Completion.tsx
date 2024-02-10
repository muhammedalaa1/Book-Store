import { useEffect } from "react";
import api from "../../utils/api";
import { useAuth } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";

const Completion = () => {
  const { user, cartItems } = useAuth();
  const navigate = useNavigate();
  console.log(cartItems);
  useEffect(() => {
    if (cartItems === undefined) {
      navigate("/", { replace: true });
    } else {
      const deleteCart = async () => {
        await api.delete(`api/cart?userId=${user?._id}`);
      };
      deleteCart();
    }

    console.log("ksadfgak");
  }, [cartItems]);

  return (
    <>
      <div className="container p-12 text-center text-lg font-medium">
        Thank You For Choosing Our Platform
      </div>
    </>
  );
};

export default Completion;
