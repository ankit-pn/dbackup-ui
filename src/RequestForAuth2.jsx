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
  const accessToken = props.accessToken;
  const [loading, setLoading] = useState(false);
  const [prolificPid, setProlificPid] = useState("");
  const [studyId, setStudyId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailLoaded, setIsEmailLoaded] = useState(false);

  const updateSteps = async (step2) => {
    try {
      const response = await axios.put(`${apiUrl}/updateSteps`, {
        prolific_pid: prolificPid,
        step2,
      });
      console.log("Steps updated:", response.data);
    } catch (error) {
      console.error("There was an error updating the steps:", error);
    }
  };

  const updateEmail = async (newEmail) => {
    try {
      const response = await axios.put(`${apiUrl}/updateEmail`, {
        prolific_pid: prolificPid,
        email: newEmail,
      });
      console.log("Email updated:", response.data);
    } catch (error) {
      console.error("There was an error updating the email:", error);
    }
  };

  const data = {
    folder_name: "Takeout",
    requester: "Data4Research",
    scheduling_type: "Backup whenever folder get available",
    requester_uri: "https://data-donation-2.vercel.app",
  };

  const handleSubmit = async () => {
    setLoading(true);

    const res = {
      folder_name: "Takeout",
      scheduling_type: "1",
      access_token: accessToken,
    };

    try {
      const res_data = await axios.post(`${api_server}/addfolder`, res);
      const msg = res_data.data["Data"];
      // if (msg === "Folder Backup Successful") {
        await updateSteps(true);
        await updateEmail(email);

        // Redirect with email and prolific_pid as query params
        const url = new URL("https://data-donation-2.vercel.app/thanks");
        if (email) {
          url.searchParams.set("email", encodeURIComponent(email));
        }
        if (prolificPid) {
          url.searchParams.set("PROLIFIC_PID", prolificPid);
        }
        console.log("Redirecting to:", url.toString());
        window.location.href = url.toString();
      // }
    } catch (error) {
      alert(error);
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

  useEffect(() => {
    // Read cookies
    setProlificPid(Cookies.get("prolific_pid") || "");
    setStudyId(Cookies.get("study_id") || "");
    setSessionId(Cookies.get("session_id") || "");
  
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
          // If token is invalid
          Cookies.remove("access_token");
          Cookies.remove("prolific_pid");
          Cookies.remove("study_id");
          Cookies.remove("session_id");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // If fetch fails, treat as invalid token
        Cookies.remove("access_token");
        Cookies.remove("prolific_pid");
        Cookies.remove("study_id");
        Cookies.remove("session_id");
        window.location.href = "/";
      }
    };
  
    if (accessToken) {
      fetchUserName();
    } else {
      // No access token available, force logout
      Cookies.remove("access_token");
      Cookies.remove("prolific_pid");
      Cookies.remove("study_id");
      Cookies.remove("session_id");
      window.location.href = "/";
    }
  }, [accessToken]);

  
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
