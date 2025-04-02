import Cookies from "js-cookie";
import { useEffect, useState } from "react"; // aama showContent maate eklu useState use karvu
import { useNavigate } from "react-router-dom";

// page blink thaine eni pachhal nu page dekhay nai ena maate aa badhi comment kari chhe mein. jene kadhi nakhsho toh pachhal nu page joi shakso.
// showContent no function etle use karu ke jyaare token delete kari daie toh login page par j laave pan ani saathe login page par aavta homepage na dekhay(1 ke 2 milisecond maate) etle evi rite laave chhe
function Publiclayout({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false); // const [showContent, setShowContent] = useState(false); add karyu chhe and import maa pan useState add karyu chhe
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/");
    } else {
      setShowContent(true); // else {setShowContent(true);} add karyu
    }
  }, []);

  return showContent && <div>{children}</div>; //showContent && baki badhu enu ej chhe
}

export default Publiclayout;
