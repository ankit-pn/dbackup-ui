import './App.css';
import AfterLogin from './AfterLogin';
import RequestForAuth from './RequestForAuth'
import PrivacyPolicy from './PrivacyPolicy';
import HomePage from './Homepage';
import Features from './Features';
import AboutUs from './AboutUs';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import PageInConstruction from './PageInConstruction';
import Disclosure from './Disclosure';
import ConfirmAuth from './ConfirmReq';
import NavBarTest from './NavBarTest';
import MainAppTest from './MainAppTest';
import { getAccessToken } from './utils/sessionStore';
function App() {
  const accessToken = getAccessToken();

  if(accessToken){
      return (
        <Router>
          <div>
            <Routes>
              <Route path="/datareq" element={<ConfirmAuth />} />
              <Route path="/test" element={<NavBarTest />} />
              <Route
                path="/google-api-services-disclosure"
                element={
                  <MainAppTest
                    accessToken={accessToken}
                    mainAppContent={<Disclosure />}
                  />
                }
              />
              <Route
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
                path="/privacypolicies"
                element={
                  <MainAppTest
                    accessToken={accessToken}
                    mainAppContent={<PrivacyPolicy />}
                  />
                }
              />
              <Route
                path="/features"
                element={
                  <MainAppTest
                    accessToken={accessToken}
                    mainAppContent={<Features />}
                  />
                }
              />
              <Route
                path="/aboutus"
                element={
                  <MainAppTest
                    accessToken={accessToken}
                    mainAppContent={<AboutUs />}
                  />
                }
              />
              <Route path="/backup" element={<RequestForAuth />} />
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
            path="/test"
            element={<NavBarTest mainContent={<Disclosure />} />}
          />
          <Route path="/datareq" element={<ConfirmAuth />} />
          <Route
            path="/google-api-services-disclosure"
            element={<NavBarTest mainContent={<Disclosure />} />}
          />
          <Route
            path="/pageinconstruction"
            element={<NavBarTest mainContent={<PageInConstruction />} />}
          />
          <Route path="/listfolder" element={<AfterLogin />} />
          <Route
            path="/privacypolicies"
            element={<NavBarTest mainContent={<PrivacyPolicy />} />}
          />
          <Route
            path="/features"
            element={<NavBarTest mainContent={<Features />} />}
          />
          <Route
            path="/aboutus"
            element={<NavBarTest mainContent={<AboutUs />} />}
          />
          <Route path="/backup" element={<RequestForAuth />} />
          <Route path="/" element={<NavBarTest mainContent={<HomePage />} />} />
        </Routes>
      </div>
    </Router>
  );
  }
}

export default App;
