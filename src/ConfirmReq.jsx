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
  // Prolific params (legacy)
  const [prolificPid, setProlificPid] = useState("");
  const [studyId, setStudyId] = useState("");
  const [sessionId, setSessionId] = useState("");
  // Clickworker params (new)
  const [clickworkerUser, setClickworkerUser] = useState("");
  const [clickworkerUserId, setClickworkerUserId] = useState("");
  const [clickworkerTaskId, setClickworkerTaskId] = useState("");
  const [clickworkerJobId, setClickworkerJobId] = useState("");

  useEffect(() => {
    const setTokenAsCookie = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      // Prolific params (legacy)
      const prolific_pid = urlParams.get("PROLIFIC_PID");
      const study_id = urlParams.get("STUDY_ID");
      const session_id = urlParams.get("SESSION_ID");
      // Clickworker params (new)
      const cw_user = urlParams.get("user");
      const cw_user_id = urlParams.get("user_id");
      const cw_task_id = urlParams.get("task_id");
      const cw_job_id = urlParams.get("job_id");

      let newUrl = window.location.pathname;

      // Store Prolific params (legacy)
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

      // Store Clickworker params (new)
      if (cw_user) {
        document.cookie = `clickworker_user=${cw_user}; secure; SameSite=Strict; path=/`;
        setClickworkerUser(cw_user);
        newUrl += newUrl.includes("?") ? `&user=${cw_user}` : `?user=${cw_user}`;
      }

      if (cw_user_id) {
        document.cookie = `clickworker_user_id=${cw_user_id}; secure; SameSite=Strict; path=/`;
        setClickworkerUserId(cw_user_id);
        newUrl += newUrl.includes("?") ? `&user_id=${cw_user_id}` : `?user_id=${cw_user_id}`;
      }

      if (cw_task_id) {
        document.cookie = `clickworker_task_id=${cw_task_id}; secure; SameSite=Strict; path=/`;
        setClickworkerTaskId(cw_task_id);
        newUrl += newUrl.includes("?") ? `&task_id=${cw_task_id}` : `?task_id=${cw_task_id}`;
      }

      if (cw_job_id) {
        document.cookie = `clickworker_job_id=${cw_job_id}; secure; SameSite=Strict; path=/`;
        setClickworkerJobId(cw_job_id);
        newUrl += newUrl.includes("?") ? `&job_id=${cw_job_id}` : `?job_id=${cw_job_id}`;
      }

      // IMPORTANT: Only accept token from URL (fresh OAuth), never from cookies
      // This ensures user always goes through authorization flow
      if (token) {
        document.cookie = `access_token=${token}; secure; SameSite=Strict; path=/`;
        setAccessToken(token);
        window.history.replaceState({}, document.title, newUrl);
      } else {
        // Clear any existing token to force re-authorization
        Cookies.remove("access_token");
        setAccessToken("");
      }
    };

    setTokenAsCookie();
  }, []);

  useEffect(() => {
    const clearAllCookies = () => {
      // Clear Prolific cookies (legacy)
      Cookies.remove("access_token");
      Cookies.remove("prolific_pid");
      Cookies.remove("study_id");
      Cookies.remove("session_id");
      // Clear Clickworker cookies (new)
      Cookies.remove("clickworker_user");
      Cookies.remove("clickworker_user_id");
      Cookies.remove("clickworker_task_id");
      Cookies.remove("clickworker_job_id");
    };

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
          clearAllCookies();
          setIsTokenValid(false);
        }
      } catch (error) {
        console.error("Error validating token:", error);
        clearAllCookies();
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
