import {Grid, Button, Image, Stack, Space, Text, Flex, Title} from '@mantine/core';
import Textt from './Textt';
import iim from './logo/png/logo-no-background.png'
const api_server = process.env.REACT_APP_API_SERVER;
const HomePage = () => {
         const handleConnectNow = () => {
           window.location.href = `${api_server}/connect`;
         };
         const handleLoginNow = () => {
           window.location.href = `${api_server}/login`;
         };

    return (
      <Grid>
                <Grid.Col span="auto">  </Grid.Col>
                <Grid.Col span={7}>

                    <Stack spacing="md" align="flex-start" h={600}>

                        <Image src={iim} />
                        <Space h="xl" />
                        <Textt content="✔ Automatically backup your Google drive folder to secure cloud" />
                        <Textt content={`✔ Schedule your backup and we will automatically backup your\n\nfolder`}/>
                        <Textt content="✔ Download folder whenever you want without going to any hustle" />
                        <Textt content="✔ All backups are securely encrypted and stored in the cloud." />
                        <Space h="xl" />
                        <Flex mih={50}
                            gap="xl"
                            justify="space-between"
                            align="center"
                            direction="row"
                            >
                            <Button variant="outline" radius="xl" onClick={handleConnectNow}>Connect Drive Now</Button>
                            <Space h="xl" />
                            <Flex justify="space-between" align="center" gap="xs">
                                <Title order={6}>
                                    <Text span c="blue" fw={700} inherit>Already have Backup? </Text>
                                </Title>
                                <Space h="xl" />
                                <Button variant="outline" radius="xl" onClick={handleLoginNow}>Login</Button>
                            </Flex>
                        </Flex>
                    </Stack>

                </Grid.Col >
                <Grid.Col span="auto">
                </Grid.Col>
            </Grid>
    )
}

export default HomePage