import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import RequestForAuth2 from "./RequestForAuth2";
import RequestForAuth from "./RequestForAuth";
import NavBarTest from "./NavBarTest";
import MainAppTest from "./MainAppTest";
import "./font.css";
import "./navbar.css";

const ConfirmAuth = () => {
  const [accessToken, setAccessToken] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(null); // null = loading, true = valid, false = invalid
  const [prolificPid, setProlificPid] = useState("");
  const [studyId, setStudyId] = useState("");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const setTokenAsCookie = () => {
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

  useEffect(() => {
    const validateToken = async () => {
      if (!accessToken) {
        setIsTokenValid(false);
        return;
      }
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.ok) {
          setIsTokenValid(true);
        } else {
          console.error("Access token invalid, clearing cookies.");
          Cookies.remove("access_token");
          Cookies.remove("prolific_pid");
          Cookies.remove("study_id");
          Cookies.remove("session_id");
          setIsTokenValid(false);
        }
      } catch (error) {
        console.error("Error validating token:", error);
        Cookies.remove("access_token");
        Cookies.remove("prolific_pid");
        Cookies.remove("study_id");
        Cookies.remove("session_id");
        setIsTokenValid(false);
      }
    };

    validateToken();
  }, [accessToken]);

  if (isTokenValid === null) {
    // Still validating token → you can show a small loader if you want
    return <div>Loading...</div>;
  }

  if (!isTokenValid) {
    // Token is missing or invalid
    return <NavBarTest mainContent={<RequestForAuth />} />;
  }

  // Token is valid
  return (
    <MainAppTest
      accessToken={accessToken}
      mainAppContent={<RequestForAuth2 accessToken={accessToken} />}
    />
  );
};

export default ConfirmAuth;
