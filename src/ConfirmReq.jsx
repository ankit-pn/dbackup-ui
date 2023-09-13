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
  const [prolificPid,setProlificPid] = useState("");
  const [studyId,setStudyId] = useState("")
  const [sessionId,setSessionId] = useState("")
  useEffect(() => {
    // Function to extract the token from the query parameter and set it as a cookie
    const setTokenAsCookie = () => {
      // Get the token from the query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const prolific_pid = urlParams.get("PROLIFIC_PID");
      const study_id = urlParams.get("STUDY_ID");
      const session_id = urlParams.get("SESSION_ID");
      let newUrl = window.location.pathname;
      if (prolific_pid) {
        document.cookie = `prolific_pid=${prolific_pid}; secure; SameSite=Strict; path=/`;
        setProlificPid(prolific_pid);
        newUrl += `?PROLIFIC_PID=${prolific_pid}`;
      }

      if (study_id) {
        document.cookie = `study_id=${study_id}; secure; SameSite=Strict; path=/`;
        setStudyId(study_id);
        newUrl += newUrl.includes("?")
          ? `&STUDY_ID=${study_id}`
          : `?STUDY_ID=${study_id}`;
      }

      if (session_id) {
        document.cookie = `session_id=${session_id}; secure; SameSite=Strict; path=/`;
        setSessionId(session_id);
        newUrl += newUrl.includes("?")
          ? `&SESSION_ID=${session_id}`
          : `?SESSION_ID=${session_id}`;
      }
      if (token) {
        document.cookie = `access_token=${token}; secure; SameSite=Strict; path=/`;
        setAccessToken(token);
        // Clear the URL search parameters
          window.history.replaceState({}, document.title, newUrl);
      } else {
        const cookieToken = Cookies.get("access_token");
        if (cookieToken) {
          setAccessToken(cookieToken);
        }
      }
    };
    setTokenAsCookie();
  }, []);

  if (accessToken === "" || accessToken === undefined) {
    return <NavBarTest mainContent={<RequestForAuth />} />;
  } else {
    return (
      <MainAppTest
        accessToken={accessToken}
        mainAppContent={<RequestForAuth2 accessToken={accessToken} />}
      />
    );
  }
};
export default ConfirmAuth;
