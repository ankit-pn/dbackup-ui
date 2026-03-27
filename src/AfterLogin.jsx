import { useEffect, useState } from "react";
import MainAppContent from "./MainAppContent";
import MainAppTest from "./MainAppTest";
import NotFound from "./NotFound";
import { getAccessToken, setAccessToken } from "./utils/sessionStore";

const AfterLogin = () => {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessTokenState] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      setAccessToken(token);
      setAccessTokenState(token);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      setAccessTokenState(getAccessToken());
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!accessToken) {
    return <NotFound />;
  }

  return (
    <MainAppTest
      accessToken={accessToken}
      mainAppContent={<MainAppContent accessToken={accessToken} />}
    />
  );
};

export default AfterLogin;
