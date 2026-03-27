import {
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
import { useEffect, useState } from "react";
import axios from "axios";
import iim from "./logo/png/logo-no-background.png";
import {
  SESSION_KEYS,
  clearSessionValues,
  getSessionValue,
} from "./utils/sessionStore";

const apiServer = process.env.REACT_APP_API_SERVER;

const trackingKeys = [
  SESSION_KEYS.prolificPid,
  SESSION_KEYS.studyId,
  SESSION_KEYS.sessionId,
  SESSION_KEYS.clickworkerUser,
  SESSION_KEYS.clickworkerUserId,
  SESSION_KEYS.clickworkerTaskId,
  SESSION_KEYS.clickworkerJobId,
];

const RequestForAuth2 = ({ accessToken }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const backendApiUrl =
    process.env.REACT_APP_API_SERVER || "https://api.dbackup.cloud";

  const [loading, setLoading] = useState(false);
  const [prolificPid, setProlificPid] = useState("");
  const [studyId, setStudyId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [clickworkerUser, setClickworkerUser] = useState("");
  const [clickworkerUserId, setClickworkerUserId] = useState("");
  const [clickworkerTaskId, setClickworkerTaskId] = useState("");
  const [clickworkerJobId, setClickworkerJobId] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailLoaded, setIsEmailLoaded] = useState(false);
  const [error, setError] = useState("");

  const data = {
    folder_name: "Takeout",
    requester: "Data4Research",
    scheduling_type: "Backup whenever folder get available",
    requester_uri: "https://data-donation.vercel.app",
  };

  const clearAllSessionState = () => {
    clearSessionValues([SESSION_KEYS.accessToken, ...trackingKeys]);
  };

  const getEffectiveUserId = () => clickworkerUserId || prolificPid || email;

  const updateSteps = async (step2) =>
    axios.put(`${apiUrl}/updateSteps`, {
      prolific_pid: prolificPid,
      step2,
    });

  const updateEmail = async (newEmail) =>
    axios.put(`${apiUrl}/updateEmail`, {
      prolific_pid: prolificPid,
      email: newEmail,
    });

  const trackStep = async (stepName) => {
    try {
      const userId = getEffectiveUserId();
      if (!userId) {
        return;
      }

      await axios.post(`${backendApiUrl}/track/step`, {
        user_id: userId,
        step_name: stepName,
        donation_type: "takeout",
        status: "completed",
        metadata: {
          email,
          clickworker_user: clickworkerUser,
          clickworker_task_id: clickworkerTaskId,
          clickworker_job_id: clickworkerJobId,
        },
      });
    } catch (err) {
      console.error("Failed to track step:", err);
    }
  };

  const initTakeoutTracking = async () => {
    try {
      const userId = getEffectiveUserId();
      if (!userId) {
        return;
      }

      await axios.post(`${backendApiUrl}/takeout/init`, {
        user_id: userId,
        email,
        clickworker_user: clickworkerUser,
        clickworker_user_id: clickworkerUserId,
        task_id: clickworkerTaskId,
        job_id: clickworkerJobId,
      });
    } catch (err) {
      console.error("Failed to initialize takeout tracking:", err);
    }
  };

  const updateTakeoutStep = async (stepName) => {
    try {
      const userId = getEffectiveUserId();
      if (!userId) {
        return;
      }

      await axios.put(`${backendApiUrl}/takeout/step`, {
        user_id: userId,
        step_name: stepName,
        value: true,
      });
    } catch (err) {
      console.error("Failed to update takeout step:", err);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.post(`${apiServer}/addfolder`, {
        folder_name: "Takeout",
        scheduling_type: "1",
        access_token: accessToken,
      });

      await updateTakeoutStep("folder_scheduled");
      await trackStep("folder_scheduled");

      if (prolificPid) {
        try {
          await updateSteps(true);
        } catch (err) {
          console.error("Failed to update legacy step tracking:", err);
        }

        try {
          await updateEmail(email);
        } catch (err) {
          console.error("Failed to update legacy email tracking:", err);
        }
      }

      await trackStep("complete");

      try {
        const userId = getEffectiveUserId();
        if (userId) {
          await axios.post(`${backendApiUrl}/takeout/complete/${userId}`);
        }
      } catch (err) {
        console.error("Failed to complete takeout tracking:", err);
      }

      const redirectUrl = new URL("https://data-donation.vercel.app/thanks");

      if (prolificPid) {
        redirectUrl.searchParams.set("PROLIFIC_PID", prolificPid);
      }
      if (clickworkerUserId) {
        redirectUrl.searchParams.set("user_id", clickworkerUserId);
      }
      if (clickworkerUser) {
        redirectUrl.searchParams.set("user", clickworkerUser);
      }
      if (clickworkerTaskId) {
        redirectUrl.searchParams.set("task_id", clickworkerTaskId);
      }
      if (clickworkerJobId) {
        redirectUrl.searchParams.set("job_id", clickworkerJobId);
      }

      window.location.href = redirectUrl.toString();
    } catch (submitError) {
      console.error("Failed to back up folder:", submitError);
      setError("Failed to back up folder. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProlificPid(getSessionValue(SESSION_KEYS.prolificPid));
    setStudyId(getSessionValue(SESSION_KEYS.studyId));
    setSessionId(getSessionValue(SESSION_KEYS.sessionId));
    setClickworkerUser(getSessionValue(SESSION_KEYS.clickworkerUser));
    setClickworkerUserId(getSessionValue(SESSION_KEYS.clickworkerUserId));
    setClickworkerTaskId(getSessionValue(SESSION_KEYS.clickworkerTaskId));
    setClickworkerJobId(getSessionValue(SESSION_KEYS.clickworkerJobId));

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) {
          throw new Error("Access token invalid");
        }

        const profile = await response.json();
        setEmail(profile.email);
        setIsEmailLoaded(true);
      } catch (profileError) {
        clearAllSessionState();
        window.location.href = "/";
      }
    };

    if (!accessToken) {
      clearAllSessionState();
      window.location.href = "/";
      return;
    }

    fetchUserProfile();
  }, [accessToken]);

  useEffect(() => {
    if (!isEmailLoaded || !email) {
      return;
    }

    initTakeoutTracking();
    trackStep("oauth");
    updateTakeoutStep("oauth_completed");
  }, [email, isEmailLoaded]);

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
          <Text span color="green">
            <a href={data.requester_uri}>{data.requester}</a>
          </Text>{" "}
          is requesting to schedule the backup given folder(s) and transfer a
          copy to their account.
        </Title>
        <Divider my="md" />
        <Flex direction="column">
          <Title order={5}>
            <Text color="blue">Folder(s) Name:</Text>
          </Title>
          <Text>{data.folder_name}</Text>
          <Divider my="sm" />
          <Title order={5}>
            <Text color="blue">Scheduling Type:</Text>
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
            <Title order={3}>Backing up folder now...</Title>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default RequestForAuth2;
