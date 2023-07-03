import { Space, Text, Title, Divider, List, Image } from "@mantine/core";
import { Box } from "@mantine/core";
import './font.css'
import iim from "./logo/png/logo-no-background.png";
const Disclosure = () => {
  return (
    <Box
      maw={800}
      mx="auto"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: "center",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
        },
      })}
    >
      <Image src={iim} />
      <Title order={1} color="Blue" align="center" style={{marginTop:'40px'}}>
        Google API Services Usage Disclosure
      </Title>
      <Divider my="md"></Divider>

      <Space h="md" />
      <Text
        align="center"
        color="black"
        className="enhance-title"
        style={{ color: "black", fontSize: 17 }}
      >
        DBackup's use and transfer of information received from Google APIs to
        any other app will adhere
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy"
          style={{ textDecoration: "none" }}
        >
          {" "}
          Google API Services User Data Policy
        </a>
        , including the {""}
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
          style={{ textDecoration: "none" }}
        >
          Limited Use requirements.
        </a>
      </Text>
      <Text
        className="enhance-title"
        align="left"
        style={{ color: "black", fontSize: 20, marginBottom: "10px" }}
      >
        Limited Use
      </Text>

      <Text
        className="enhance-title"
        align="left"
        style={{ color: "black", fontSize: 15, marginBottom: "10px" }}
      >
        Our app strictly complies with all conditions specified in the limited
        use policy of Google.
      </Text>
      <List spacing="xs" align="left">
        <List.Item>
          Do not allow humans to read the user's data unless you have obtained
          the user's affirmative agreement to view specific messages, files, or
          other data.
        </List.Item>
        <List.Item>
          Do not use or transfer the data for serving ads, including
          retargeting, personalized, or interest-based advertising
        </List.Item>
        <List.Item>
          Limit your use of data to providing or improving user-facing features
          that are prominent in the requesting application's user interface. All
          other uses of the data are prohibited
        </List.Item>
        <List.Item>
          Only transfer the data to others if necessary to provide or improve
          user-facing features that are prominent in the requesting
          application's user interface.
        </List.Item>
      </List>
      <Text
        className="enhance-title"
        align="left"
        style={{
          color: "black",
          fontSize: 15,
          marginBottom: "10px",
          marginTop: "20px",
        }}
      >
        Our <a href="/privacypolicies">privacy policy page</a> documents in
        detail what data our app is requesting and why the requests access to
        Google user data.
      </Text>
      <Space h="md" />
    </Box>
  );
};
export default Disclosure;
