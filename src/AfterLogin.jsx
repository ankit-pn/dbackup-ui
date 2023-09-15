import NotFound from './NotFound'
import MainApp from './MainApp'
import MainAppTest from './MainAppTest';
import Cookies from 'js-cookie';
import MainAppContent from './MainAppContent';
import { useEffect,useState } from 'react';
const AfterLogin = () => {
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState('');
    useEffect(() => {
      // Function to extract the token from the query parameter and set it as a cookie
      const setTokenAsCookie = () => {
        // Get the token from the query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
          const date = new Date();
          date.setTime(date.getTime() + 30 * 60 * 1000); // 30 minutes
          const expires = `expires=${date.toGMTString()}`;
          document.cookie = `access_token=${token}; ${expires}; secure; SameSite=Strict; path=/`;

          setAccessToken(token);
          // Clear the URL search parameters
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        } else {
         const cookieToken = Cookies.get('access_token');
         if (cookieToken) {
           setAccessToken(cookieToken);
         }
        }
        setLoading(false);
      };
      
      // Call the function to set the token as a cookie when the component mounts
      setTokenAsCookie();
    }, []);

    if (loading) {
      // Display a loading state until the token is set
      return <div>Loading...</div>;
    }
    if (!accessToken) {
      // If the token is not available, render the NotFound component
      return <NotFound />;
    } 
    return <MainAppTest accessToken={accessToken} mainAppContent={<MainAppContent accessToken={accessToken}/>}/>
};
export default AfterLogin;
