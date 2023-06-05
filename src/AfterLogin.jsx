import NotFound from './NotFound'
import MainApp from './MainApp'
import Cookies from 'js-cookie';
import MainAppContent from './MainAppContent';
const AfterLogin = () => {
    const accessToken = Cookies.get('access_token');
    console.log(accessToken)
    if(accessToken===undefined)
    return <NotFound></NotFound>
    else{
    return <MainApp accessToken={accessToken} mainAppContent={<MainAppContent accessToken={accessToken}/>}/>
    }
};
export default AfterLogin;
