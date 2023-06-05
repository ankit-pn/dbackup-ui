import { AppShell, Header, Grid, Button, Space, Text, Flex, Title, Table, Overlay, Loader } from '@mantine/core';
import iim from './logo/png/logo-no-background.png';
import { TextInput, Checkbox, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Input } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { IconTrash, IconDownload } from '@tabler/icons-react';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import MainAppContent from './MainAppContent';
const api_server = process.env.REACT_APP_API_SERVER;
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
          <Header height={60} p="xs">
            <Grid justify="flex-end">
              <Grid.Col span={2}>
                <img src={iim} alt="logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
              </Grid.Col>
              <Grid.Col span="auto"></Grid.Col>
              <Grid.Col span={2}>
                <Button variant="subtle" onClick={handlePrivacyButton}>
                  Privacy Policy
                </Button>
              </Grid.Col>
              <Grid.Col span={2}>
                <Button variant="subtle" onClick={handleFeaturesButton}>
                  Features
                </Button>
              </Grid.Col>
              <Grid.Col span={2}>
                <Button variant="subtle" onClick={handleAboutButton}>
                  About
                </Button>
              </Grid.Col>
              <Grid.Col span={3} p="md">
                <Flex justify="flex-start" align="center" gap="xs">
                  <Text
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                    ta="center"
                    fz="md"
                    fw={700}
                  >
                    {email}
                  </Text>
                  <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} onClick={handleLogout}>
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
