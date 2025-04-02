import Cookies from "js-cookie";
import { useEffect, useState } from "react"; // aama showContent maate eklu useState use karvu
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { getCurrentUser } from "../api-services/users-service";
import { message } from "antd";
import usersGlobalStore, { UsersStoreType } from "../store/users-store";
import Spinner from "../components/spinner";

// showContent no function etle use karu ke jyaare token delete kari daie toh login page par j laave pan ani saathe login page par aavta homepage na dekhay(1 ke 2 milisecond maate) etle evi rite laave chhe
function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false); // const [showContent, setShowContent] = useState(false); add karyu chhe and import maa pan useState add karyu chhe
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setCurrentUser, currentUser }: UsersStoreType =
    usersGlobalStore() as UsersStoreType;
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUser();
      setCurrentUser(response.data);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    } else {
      getData();
      setShowContent(true); // else {setShowContent(true);} add karyu
    }
  }, []);

  if(loading){
    return <div className="flex items-center justify-center h-screen" > 
    <Spinner /> </div>
  }


  return (
    showContent &&
    currentUser && (
      <div className="flex lg:flex-row flex-col gap-5 h-screen">
        <Sidebar />
        <div className="flex-1 px-5 lg:mt-5 pb-10 overflow-y-scroll"> {children} </div>
      </div>
    )
  ); //showContent && baki badhu enu ej chhe
}

export default PrivateLayout;
