import { AppShell, Header, Grid, Button, Flex} from '@mantine/core';
import iim from './logo/png/logo-no-background.png'
import './font.css'
import './navbar.css'
import drivelogo from './logo/logo_drive_2020q4_color_2x_web_64dp.png'
import signingwithgoogle from './logo/btn_google_signin_light_normal_web@2x.png'
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
          <Header
            height={60}
            style={{ backgroundColor: "rgba(39, 245, 198, 0.3)" }}
          >
            <Grid
              p="xs"
              className="navbar-grid"
              justify="flex-start"
              height={60}
            >
              <Grid.Col span={2}>
                <a href="/">
                  <img
                    src={iim}
                    alt="logo"
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      alignSelf: "left",
                    }}
                  />
                </a>
              </Grid.Col>
              <Grid.Col span={2}>
                {" "}
                <Button
                  variant="subtle"
                  onClick={handlePrivacyButton}
                  className="navbar-button"
                  style={{ marginLeft: "100px" }}
                >
                  Privacy Policy
                </Button>
              </Grid.Col>
              <Grid.Col span={2}>
                {" "}
                <Button
                  variant="subtle"
                  onClick={handleFeaturesButton}
                  className="navbar-button"
                  style={{ marginLeft: "100px" }}
                >
                  Features
                </Button>
              </Grid.Col>
              <Grid.Col span={2}>
                {" "}
                <Button
                  variant="subtle"
                  onClick={handleAboutButton}
                  className="navbar-button"
                  style={{ marginLeft: "100px" }}
                >
                  About
                </Button>
              </Grid.Col>
              <Grid.Col span={2}>
                <Flex justify="space-between" align="center">
                  <Button
                    onClick={handleConnectNow}
                    className="navbar-button-1"
                    variant="outline"
                    style={{ marginLeft: "50px", marginButtom: "20px" }}
                  >
                    Connect
                    <img
                      src={drivelogo}
                      alt="nan"
                      style={{ width: "20px", marginLeft: "10px" }}
                    />
                  </Button>{" "}
                  <img
                    src={signingwithgoogle}
                    alt="nan"
                    style={{
                      width: "170px",
                      marginLeft: "10px",
                      marginButtom: "20px",
                    }}
                    onClick={handleLoginNow}
                  />
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