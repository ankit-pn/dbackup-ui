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
import { useState } from "react";
import axios from "axios";
const api_server = process.env.REACT_APP_API_SERVER;

const RequestForAuth2 = (props) => {
  const accessToken = props.accessToken;
  const [loading, setLoading] = useState(false);
  const data = {
    folder_name: "Takeout",
    requester: "Data4Research",
    scheduling_type: "Backup whenever folder get available",
    requester_uri: "https://data-donation.vercel.app",
  };
  const handleSubmit = async () => {
    setLoading(true);
    const res = {};
    console.log(data);
    res["folder_name"] = "Takeout";
    res["scheduling_type"] = "1";
    res["access_token"] = accessToken;
    console.log(res);
    const url = `${api_server}/addfolder`;
    try {
      const res_data = await axios.post(url, res);
      //  const msg = res_data.data["Data"];
      //  alert(`${msg}`);
      window.location.href = "https://data-donation.vercel.app/thanks";
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Box
        maw={400}
        mx="auto"
        p="md" // Padding adjusted
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
        <img src={iim} alt="logo" style={{ maxWidth: "100%" }} />{" "}
        {/* Max height removed */}
        <Divider my="md" />
        <Title order={4} align="left">
          <Text span color="Green">
            <a href={data.requester_uri}>{data.requester}</a>
          </Text>{" "}
          is requesting to schedule the backup given folder(s) to and then
          requesting to transfer a copy of this data to their account.
        </Title>
        <Divider my="md" />
        <Flex direction="column">
          <Title order={5}>
            <Text color="Blue">Folder(s) Name: </Text>
          </Title>
          <Text>{data.folder_name} </Text>
          <Divider my="sm" />
          <Title order={5}>
            <Text color="Blue">Scheduling Type:</Text>
          </Title>
          <Text>{data.scheduling_type}</Text>
          <Divider my="sm" />
          <Checkbox label="I agree to term and conditions and privacy policy of dBackup Cloud Services" />
          <Divider my="sm" />
          <Button onClick={handleSubmit}>Confirm Data Donation</Button>
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
            <Title order={3}> Backing up folder Now</Title>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default RequestForAuth2;
