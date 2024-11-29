import React, { useContext, useEffect } from "react";
// import { ShopContext } from "../context/ShopContext";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { toast } from "react -toastify";
import axios from "axios";
import "./Verify.css"
import { StoreContext } from "../../context/StoreContext";

const Verify = () => {
//   const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const {url} = useContext(StoreContext)
  const navigate = useNavigate()

 

  const verifyPayment = async () => {
    try {
    //   if (!token) {
    //     return null;
    //   }
      const response = await axios.post(
        url + "/api/order/verify",
        { success, orderId },
        // { headers: { token } }
      );
      
      if (response.data.success) {
        // setCartItems({});
        navigate("/myorders");
      } else {
        navigate("/myorders");
      }
    } catch (error) {
      console.log(error);
    //   toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return <div className="verify">
    <div className="spinner">   </div>
  </div>;
};

export default Verify;
