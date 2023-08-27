import './App.css';
import NavBar from './NavBar';
import AfterLogin from './AfterLogin';
import RequestForAuth from './RequestForAuth'
import PrivacyPolicy from './PrivacyPolicy';
import HomePage from './Homepage';
import Features from './Features';
import AboutUs from './AboutUs';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import MainApp from './MainApp';
import PageInConstruction from './PageInConstruction';
import Disclosure from './Disclosure';
import ConfirmAuth from './ConfirmReq';
import NavBarTest from './NavBarTest';
import MainAppTest from './MainAppTest';
function App() {
  if(Cookies.get('access_token')!==undefined){
    const accessToken = Cookies.get('access_token')
    console.log("Here",accessToken);
      return (
        <Router>
          <div>
            <Routes>
              <Route exact path="/datareq" element={<ConfirmAuth />} />
              <Route exact path="/test" element={<NavBarTest />} />
              <Route
                exact
                path="/google-api-services-disclosure"
                element={
                  <MainAppTest
                    accessToken={accessToken}
                    mainAppContent={<Disclosure />}
                  />
                }
              />
              <Route
                exact
                path="/pageinconstruction"
                element={
                  <MainAppTest
                    accessToken={accessToken}
                    mainAppContent={<PageInConstruction />}
                  />
                }
              />
              <Route path="/listfolder" element={<AfterLogin />} />
              <Route
                exact
                path="/privacypolicies"
                element={
                  <MainAppTest
                    accessToken={accessToken}
                    mainAppContent={<PrivacyPolicy />}
                  />
                }
              />
              <Route
                exact
                path="/features"
                element={
                  <MainAppTest
                    accessToken={accessToken}
                    mainAppContent={<Features />}
                  />
                }
              />
              <Route
                exact
                path="/aboutus"
                element={
                  <MainAppTest
                    accessToken={accessToken}
                    mainAppContent={<AboutUs />}
                  />
                }
              />
              <Route exact path="/backup" element={<RequestForAuth />} />
              <Route path="/" element={<NavBarTest mainContent={<HomePage />} />} />
            </Routes>
          </div>
        </Router>
      );
  }
  else{
  return (
    <Router>
      <div>
        <Routes>
          <Route
            exact
            path="/test"
            element={<NavBarTest mainContent={<Disclosure />} />}
          />
          <Route exact path="/datareq" element={<ConfirmAuth />} />
          <Route
            exact
            path="/google-api-services-disclosure"
            element={<NavBarTest mainContent={<Disclosure />} />}
          />
          <Route
            exact
            path="/pageinconstruction"
            element={<NavBarTest mainContent={<PageInConstruction />} />}
          />
          <Route exact path="/listfolder" element={<AfterLogin />} />
          <Route
            exact
            path="/privacypolicies"
            element={<NavBarTest mainContent={<PrivacyPolicy />} />}
          />
          <Route
            exact
            path="/features"
            element={<NavBarTest mainContent={<Features />} />}
          />
          <Route
            exact
            path="/aboutus"
            element={<NavBarTest mainContent={<AboutUs />} />}
          />
          <Route exact path="/backup" element={<RequestForAuth />} />
          <Route path="/" element={<NavBarTest mainContent={<HomePage />} />} />
        </Routes>
      </div>
    </Router>
  );
  }
}

export default App;
