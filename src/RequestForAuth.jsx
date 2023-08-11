import { Grid, Button, Text, Flex, Title, Divider } from '@mantine/core';
import iim from './logo/png/logo-no-background.png';
import {Checkbox, Box } from '@mantine/core';
const api_server = process.env.REACT_APP_API_SERVER;
const RequestForAuth = () => {
  const data = {
    folder_name: 'Takeout',
    requester: 'Data4Research',
    scheduling_type: 'Backup whenever folder get available',
    requester_uri: 'https://data-donation.vercel.app'
  };
  const handleSubmit = () =>{
     window.location.href = `${api_server}/connect?auth-request=datareq`;
  }

  return (
    <Box
      maw={400}
      mx="auto"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: "center",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: "pointer",

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
        },
      })}
    >
      <img
        src={iim}
        alt="logo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
      <Divider my="md" />
      <Title order={4} align="center">
        <Text span color="Green">
          <a href={data.requester_uri}>{data.requester}</a>
        </Text>{" "}
        is requesting to schedule the backup given folder(s) to and then
        requesting to transfer a copy of this data to their account.
      </Title>
      <Divider my="md" />
      <Flex direction="column">
        <Grid>
          <Grid.Col span="auto">
            <Title order={5}>
              <Text color="Blue">Folder(s) Name: </Text>
            </Title>
          </Grid.Col>
          <Grid.Col span="auto">
            <Text>{data.folder_name} </Text>{" "}
          </Grid.Col>
        </Grid>
        <Divider my="sm" />
        <Grid>
          <Grid.Col span="auto">
            <Title order={5}>
              <Text color="Blue">Scheduling Type:</Text>
            </Title>
          </Grid.Col>
          <Grid.Col span="auto">
            <Text>{data.scheduling_type}</Text>{" "}
          </Grid.Col>
        </Grid>
        <Divider my="sm" />
        <Grid>
          <Grid.Col span="auto" checked>
            <Checkbox label="I agree to term and conditions and privacy policy of dBackup Cloud Servies" />
          </Grid.Col>
        </Grid>
        <Divider my="sm" />
        <Grid>
          <Grid.Col span="auto">
            <Button onClick={handleSubmit}>Authorize</Button>
          </Grid.Col>
        </Grid>
      </Flex>
    </Box>
  );
};
export default RequestForAuth;
