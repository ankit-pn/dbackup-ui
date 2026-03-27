import { useEffect, useState } from "react";
import RequestForAuth2 from "./RequestForAuth2";
import RequestForAuth from "./RequestForAuth";
import NavBarTest from "./NavBarTest";
import MainAppTest from "./MainAppTest";
import "./font.css";
import "./navbar.css";
import {
  SESSION_KEYS,
  clearSessionValues,
  getAccessToken,
  setAccessToken,
  setSessionValue,
} from "./utils/sessionStore";

const trackingKeys = [
  SESSION_KEYS.prolificPid,
  SESSION_KEYS.studyId,
  SESSION_KEYS.sessionId,
  SESSION_KEYS.clickworkerUser,
  SESSION_KEYS.clickworkerUserId,
  SESSION_KEYS.clickworkerTaskId,
  SESSION_KEYS.clickworkerJobId,
];

const ConfirmAuth = () => {
  const [accessToken, setAccessTokenState] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    setSessionValue(SESSION_KEYS.prolificPid, urlParams.get("PROLIFIC_PID"));
    setSessionValue(SESSION_KEYS.studyId, urlParams.get("STUDY_ID"));
    setSessionValue(SESSION_KEYS.sessionId, urlParams.get("SESSION_ID"));
    setSessionValue(SESSION_KEYS.clickworkerUser, urlParams.get("user"));
    setSessionValue(SESSION_KEYS.clickworkerUserId, urlParams.get("user_id"));
    setSessionValue(SESSION_KEYS.clickworkerTaskId, urlParams.get("task_id"));
    setSessionValue(SESSION_KEYS.clickworkerJobId, urlParams.get("job_id"));

    if (token) {
      setAccessToken(token);
      setAccessTokenState(token);
    } else {
      setAccessTokenState(getAccessToken());
    }

    if (window.location.search) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const clearAuthState = () => {
      clearSessionValues([SESSION_KEYS.accessToken, ...trackingKeys]);
    };

    const validateToken = async () => {
      if (!accessToken) {
        setIsTokenValid(false);
        return;
      }

      try {
        const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
          setIsTokenValid(true);
          return;
        }
      } catch (error) {
        // Validation failure falls through to auth reset.
      }

      clearAuthState();
      setIsTokenValid(false);
    };

    validateToken();
  }, [accessToken]);

  if (isTokenValid === null) {
    return <div>Loading...</div>;
  }

  if (!isTokenValid) {
    return <NavBarTest mainContent={<RequestForAuth />} />;
  }

  return (
    <MainAppTest
      accessToken={accessToken}
      mainAppContent={<RequestForAuth2 accessToken={accessToken} />}
    />
  );
};

export default ConfirmAuth;
