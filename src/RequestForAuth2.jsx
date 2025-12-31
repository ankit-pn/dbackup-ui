import {
  Grid,
  Button,
  Text,
  Flex,
  Title,
  Divider,
  Overlay,
  Loader,
  Space,
  Checkbox,
  Box,
} from "@mantine/core";
import iim from "./logo/png/logo-no-background.png";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const api_server = process.env.REACT_APP_API_SERVER;

const RequestForAuth2 = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const backendApiUrl = process.env.REACT_APP_API_SERVER || "https://api.dbackup.cloud";
  const accessToken = props.accessToken;
  const [loading, setLoading] = useState(false);
  // Prolific params (legacy)
  const [prolificPid, setProlificPid] = useState("");
  const [studyId, setStudyId] = useState("");
  const [sessionId, setSessionId] = useState("");
  // Clickworker params (new)
  const [clickworkerUser, setClickworkerUser] = useState("");
  const [clickworkerUserId, setClickworkerUserId] = useState("");
  const [clickworkerTaskId, setClickworkerTaskId] = useState("");
  const [clickworkerJobId, setClickworkerJobId] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailLoaded, setIsEmailLoaded] = useState(false);
  const [error, setError] = useState("");

  // Get effective user ID (Clickworker or Prolific)
  const getEffectiveUserId = () => {
    return clickworkerUserId || prolificPid || email;
  };

  const updateSteps = async (step2) => {
    const response = await axios.put(`${apiUrl}/updateSteps`, {
      prolific_pid: prolificPid,
      step2,
    });
    console.log("Steps updated:", response.data);
    return response;
  };

  const updateEmail = async (newEmail) => {
    const response = await axios.put(`${apiUrl}/updateEmail`, {
      prolific_pid: prolificPid,
      email: newEmail,
    });
    console.log("Email updated:", response.data);
    return response;
  };

  // Track step via new unified tracking API
  const trackStep = async (stepName) => {
    try {
      const userId = getEffectiveUserId();
      if (!userId) return;

      await axios.post(`${backendApiUrl}/track/step`, {
        user_id: userId,
        step_name: stepName,
        donation_type: "takeout",
        status: "completed",
        metadata: {
          email: email,
          clickworker_user: clickworkerUser,
          clickworker_task_id: clickworkerTaskId,
          clickworker_job_id: clickworkerJobId,
        }
      });
      console.log(`Step tracked: ${stepName}`);
    } catch (err) {
      console.error("Failed to track step:", err);
    }
  };

  // Initialize takeout tracking
  const initTakeoutTracking = async () => {
    try {
      const userId = getEffectiveUserId();
      if (!userId) return;

      await axios.post(`${backendApiUrl}/takeout/init`, {
        user_id: userId,
        email: email,
        clickworker_user: clickworkerUser,
        clickworker_user_id: clickworkerUserId,
        task_id: clickworkerTaskId,
        job_id: clickworkerJobId,
      });
      console.log("Takeout tracking initialized");
    } catch (err) {
      console.error("Failed to init takeout tracking:", err);
    }
  };

  // Update takeout step
  const updateTakeoutStep = async (stepName) => {
    try {
      const userId = getEffectiveUserId();
      if (!userId) return;

      await axios.put(`${backendApiUrl}/takeout/step`, {
        user_id: userId,
        step_name: stepName,
        value: true,
      });
      console.log(`Takeout step updated: ${stepName}`);
    } catch (err) {
      console.error("Failed to update takeout step:", err);
    }
  };

  const data = {
    folder_name: "Takeout",
    requester: "Data4Research",
    scheduling_type: "Backup whenever folder get available",
    requester_uri: "https://data-donation.vercel.app",
  };

  const handleSubmit = async () => {
    setLoading(true);

    const res = {
      folder_name: "Takeout",
      scheduling_type: "1",
      access_token: accessToken,
    };

    try {
      setError("");

      const res_data = await axios.post(`${api_server}/addfolder`, res);
      const msg = res_data.data["Data"];

      // Track folder scheduled step
      await updateTakeoutStep("folder_scheduled");
      await trackStep("folder_scheduled");

      // Update steps - stop if fails (legacy Prolific tracking)
      if (prolificPid) {
        try {
          await updateSteps(true);
        } catch (err) {
          console.error("Failed to update steps:", err);
          // Don't stop for legacy tracking failure
        }

        try {
          await updateEmail(email);
        } catch (err) {
          console.error("Failed to update email:", err);
          // Don't stop for legacy tracking failure
        }
      }

      // Track completion
      await trackStep("complete");

      // Complete takeout tracking
      try {
        const userId = getEffectiveUserId();
        if (userId) {
          await axios.post(`${backendApiUrl}/takeout/complete/${userId}`);
        }
      } catch (err) {
        console.error("Failed to complete takeout tracking:", err);
      }

      // Redirect with email and all params
      const url = new URL("https://data-donation.vercel.app/thanks");
      if (email) {
        url.searchParams.set("email", encodeURIComponent(email));
      }
      // Include Prolific params (legacy)
      if (prolificPid) {
        url.searchParams.set("PROLIFIC_PID", prolificPid);
      }
      // Include Clickworker params
      if (clickworkerUserId) {
        url.searchParams.set("user_id", clickworkerUserId);
      }
      if (clickworkerUser) {
        url.searchParams.set("user", clickworkerUser);
      }
      if (clickworkerTaskId) {
        url.searchParams.set("task_id", clickworkerTaskId);
      }
      if (clickworkerJobId) {
        url.searchParams.set("job_id", clickworkerJobId);
      }
      console.log("Redirecting to:", url.toString());
      window.location.href = url.toString();
    } catch (error) {
      console.error("Failed to backup folder:", error);
      setError("Failed to backup folder. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   // Read cookies
  //   setProlificPid(Cookies.get("prolific_pid") || "");
  //   setStudyId(Cookies.get("study_id") || "");
  //   setSessionId(Cookies.get("session_id") || "");

  //   // Fetch email from Google
  //   const fetchUserName = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://www.googleapis.com/oauth2/v3/userinfo",
  //         {
  //           headers: { Authorization: `Bearer ${accessToken}` },
  //         }
  //       );
  //       if (response.ok) {
  //         const profile = await response.json();
  //         setEmail(profile.email);
  //       } else {
  //         console.error("Failed to fetch user profile:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch user profile:", error);
  //     }
  //   };

  //   if (accessToken) {
  //     fetchUserName();
  //   }
  // }, [accessToken]);

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

  useEffect(() => {
    // Read Prolific cookies (legacy)
    setProlificPid(Cookies.get("prolific_pid") || "");
    setStudyId(Cookies.get("study_id") || "");
    setSessionId(Cookies.get("session_id") || "");
    // Read Clickworker cookies (new)
    setClickworkerUser(Cookies.get("clickworker_user") || "");
    setClickworkerUserId(Cookies.get("clickworker_user_id") || "");
    setClickworkerTaskId(Cookies.get("clickworker_task_id") || "");
    setClickworkerJobId(Cookies.get("clickworker_job_id") || "");

    // Fetch email from Google and validate token
    const fetchUserName = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.ok) {
          const profile = await response.json();
          setEmail(profile.email);
          setIsEmailLoaded(true);
        } else {
          console.error("Access token invalid, clearing cookies and redirecting.");
          clearAllCookies();
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        clearAllCookies();
        window.location.href = "/";
      }
    };

    if (accessToken) {
      fetchUserName();
    } else {
      // No access token available, force logout
      clearAllCookies();
      window.location.href = "/";
    }
  }, [accessToken]);

  // Initialize takeout tracking when email is loaded
  useEffect(() => {
    if (isEmailLoaded && email) {
      initTakeoutTracking();
      trackStep("oauth");
      updateTakeoutStep("oauth_completed");
    }
  }, [isEmailLoaded, email]);

  
  return (
    <>
      <Box
        maw={400}
        mx="auto"
        p="md"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          textAlign: "center",
          borderRadius: theme.radius.md,
          cursor: "pointer",
        })}
      >
        <img src={iim} alt="logo" style={{ maxWidth: "100%" }} />
        <Divider my="md" />
        <Title order={4} align="left">
          <Text span color="Green">
            <a href={data.requester_uri}>{data.requester}</a>
          </Text>{" "}
          is requesting to schedule the backup given folder(s) and transfer a copy to their account.
        </Title>
        <Divider my="md" />
        <Flex direction="column">
          <Title order={5}>
            <Text color="Blue">Folder(s) Name:</Text>
          </Title>
          <Text>{data.folder_name}</Text>
          <Divider my="sm" />
          <Title order={5}>
            <Text color="Blue">Scheduling Type:</Text>
          </Title>
          <Text>{data.scheduling_type}</Text>
          <Divider my="sm" />
          <Checkbox label="I agree to terms and conditions and privacy policy of dBackup Cloud Services" />
          <Divider my="sm" />
          {error && (
            <Text color="red" size="sm" mb="sm">
              {error}
            </Text>
          )}
          <Button onClick={handleSubmit} disabled={!isEmailLoaded}>
            {isEmailLoaded ? "Confirm Data Donation" : "Loading..."}
          </Button>
        </Flex>
      </Box>

      {loading && (
        <Overlay zIndex={1000} opacity={0.75} color="#fff">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Loader size="md" />
            <Space h="md" />
            <Title order={3}>Backing up folder now…</Title>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default RequestForAuth2;
