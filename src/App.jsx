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
function App() {
  if(Cookies.get('access_token')!==undefined){
    const accessToken = Cookies.get('access_token')
    console.log("Here",accessToken);
      return (
        <Router>
          <div>
            <Routes>
              <Route
                exact
                path="/datareq"
                element={
                 <ConfirmAuth/>
                }
              />
              <Route
                exact
                path="/google-api-services-disclosure"
                element={
                  <MainApp
                    accessToken={accessToken}
                    mainAppContent={<Disclosure />}
                  />
                }
              />
              <Route
                exact
                path="/pageinconstruction"
                element={
                  <MainApp
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
                  <MainApp
                    accessToken={accessToken}
                    mainAppContent={<PrivacyPolicy />}
                  />
                }
              />
              <Route
                exact
                path="/features"
                element={
                  <MainApp
                    accessToken={accessToken}
                    mainAppContent={<Features />}
                  />
                }
              />
              <Route
                exact
                path="/aboutus"
                element={
                  <MainApp
                    accessToken={accessToken}
                    mainAppContent={<AboutUs />}
                  />
                }
              />
              <Route exact path="/backup" element={<RequestForAuth />} />
              <Route path="/" element={<NavBar mainContent={<HomePage />} />} />
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
            path="/datareq"
            element={<ConfirmAuth/>}
          />
          <Route
            exact
            path="/google-api-services-disclosure"
            element={<NavBar mainContent={<Disclosure />} />}
          />
          <Route
            exact
            path="/pageinconstruction"
            element={<NavBar mainContent={<PageInConstruction />} />}
          />
          <Route exact path="/listfolder" element={<AfterLogin />} />
          <Route
            exact
            path="/privacypolicies"
            element={<NavBar mainContent={<PrivacyPolicy />} />}
          />
          <Route
            exact
            path="/features"
            element={<NavBar mainContent={<Features />} />}
          />
          <Route
            exact
            path="/aboutus"
            element={<NavBar mainContent={<AboutUs />} />}
          />
          <Route exact path="/backup" element={<RequestForAuth />} />
          <Route path="/" element={<NavBar mainContent={<HomePage />} />} />
        </Routes>
      </div>
    </Router>
  );
  }
}

export default App;
