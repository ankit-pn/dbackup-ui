import { AppShell, Header, Grid, Button, Text, Flex, } from '@mantine/core';
import iim from './logo/png/logo-no-background.png';
import { useEffect, useState } from 'react';
import "./font.css";
import "./navbar.css";
import Cookies from 'js-cookie';

const MainApp = (props) => {
    const accessToken = props.accessToken;
    const [email, setEmail] = useState('');
     const handlePrivacyButton = () => {
       window.location.href = '/privacypolicies';
     };
     const handleFeaturesButton = () => {
       window.location.href = '/features';
     };
     const handleAboutButton = () => {
       window.location.href = '/aboutus';
     };
    
     const handleLogout = () => {
       Cookies.remove('access_token');
       window.location.href = '/';
     };
    useEffect(()=>{
        const fetchUserName = async () => {
             try {
               const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                 headers: {
                   Authorization: `Bearer ${accessToken}`,
                 },
               });

               if (response.ok) {
                 const data = await response.json();
                 setEmail(data.email);
               } else {
                 // Handle error response
                 console.error('Failed to fetch user profile:', response.statusText);
               }
             } catch (error) {
               console.error('Failed to fetch user profile:', error);
             }
        }
        fetchUserName();
    },[accessToken]);
    return (
      <AppShell
        padding="md"
        header={
          <Header
            height={60}
            style={{ backgroundColor: "rgba(39, 245, 198, 1)" }}
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
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </a>
              </Grid.Col>
              <Grid.Col span={2}>
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
                <Button
                  variant="subtle"
                  onClick={handleAboutButton}
                  className="navbar-button"
                  style={{ marginLeft: "100px" }}
                >
                  About
                </Button>
              </Grid.Col>
              <Grid.Col span={2} p="md">
                <Flex justify="flex-start" align="center" gap="xs">
                  <Button
                    className="navbar-button-1"
                    variant="outline"
                    style={{ marginLeft: "50px", marginButtom: "20px" }}
                  >
                    {email}
                  </Button>
                  <Button
                    className="navbar-button-1"
                    variant="outline"
                    style={{ marginRight: "50px", marginButtom: "20px" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Flex>
              </Grid.Col>
            </Grid>
          </Header>
        }
      >
        {props.mainAppContent}
      </AppShell>
    );
};
export default MainApp;
