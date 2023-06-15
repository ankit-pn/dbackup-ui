import { AppShell, Header, Grid, Button, Flex} from '@mantine/core';
import iim from './logo/png/logo-no-background.png'
const api_server = process.env.REACT_APP_API_SERVER;
const NavBar = ({mainContent}) => {

    const handleConnectNow = () => {
        window.location.href = `${api_server}/connect`;
    }
    const handleLoginNow = () => {
        window.location.href = `${api_server}/login`;
    }
    const handlePrivacyButton = () => {
        window.location.href = '/privacypolicies'
    }
    const handleFeaturesButton = () => {
        window.location.href = '/features'
    }
    const handleAboutButton = () => {
        window.location.href = '/aboutus'
    }

    return (
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            <Grid justify="flex-end">
              <a href='/'>
                <Grid.Col span={2}>
                  <img
                    src={iim}
                    alt="logo"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </Grid.Col>
              </a>
              <Grid.Col span="auto"></Grid.Col>
              <Grid.Col span={2}>
                {" "}
                <Button variant="subtle" onClick={handlePrivacyButton}>
                  Privacy Policy
                </Button>
              </Grid.Col>
              <Grid.Col span={2}>
                {" "}
                <Button variant="subtle" onClick={handleFeaturesButton}>
                  Features
                </Button>
              </Grid.Col>
              <Grid.Col span={2}>
                {" "}
                <Button variant="subtle" onClick={handleAboutButton}>
                  About
                </Button>
              </Grid.Col>
              <Grid.Col span={2} p="md">
                <Flex justify="space-between" align="center">
                  <Button
                    variant="gradient"
                    gradient={{ from: "indigo", to: "cyan" }}
                    onClick={handleConnectNow}
                  >
                    Connect
                  </Button>{" "}
                  <Button
                    variant="gradient"
                    gradient={{ from: "indigo", to: "cyan" }}
                    onClick={handleLoginNow}
                  >
                    Login
                  </Button>
                </Flex>
              </Grid.Col>
            </Grid>
          </Header>
        }
      >
        {mainContent}
      </AppShell>
    );
}
export default NavBar