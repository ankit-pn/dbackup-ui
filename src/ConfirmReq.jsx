import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import RequestForAuth2 from "./RequestForAuth2";
import RequestForAuth from "./RequestForAuth";
import NavBar from "./NavBar";
import MainApp from "./MainApp";
import NavBarTest from "./NavBarTest";
import "./font.css";
import "./navbar.css";
import MainAppTest from "./MainAppTest";


const ConfirmAuth = () => {
  
const [accessToken, setAccessToken] = useState("");
   useEffect(() => {
     // Function to extract the token from the query parameter and set it as a cookie
     const setTokenAsCookie = () => {
       // Get the token from the query parameter
       const urlParams = new URLSearchParams(window.location.search);
       const token = urlParams.get("token");

       if (token) {
         document.cookie = `access_token=${token}; secure; SameSite=Strict; path=/`;
         setAccessToken(token);
         // Clear the URL search parameters
         window.history.replaceState(
           {},
           document.title,
           window.location.pathname
         );
       } else {
         const cookieToken = Cookies.get("access_token");
         if (cookieToken) {
           setAccessToken(cookieToken);
         }
       }
     };
     setTokenAsCookie();
   }, []);

 
    if(accessToken==="" || accessToken===undefined){   
        return <NavBarTest mainContent={<RequestForAuth />}/>;
    }
    else{  
         return (
           <MainAppTest
             accessToken={accessToken}
             mainAppContent={<RequestForAuth2 accessToken={accessToken} />}
           />
         );
    }}
;
export default ConfirmAuth;
