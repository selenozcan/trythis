import { BrowserRouter as Router, Routes, Route } from "react-router";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { ActivitiesProvider } from "./context/ActivitiesContext";
import LoginRequired from "./components/LoginRequired";
import Login from "./pages/Login/Login";
import SeeAllActivities from "./pages/SeeAllActtvities/SeeAllActivities";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardLayout from "./components/DashborardLayout/DashboardLayout";
import FindNewActivity from "./pages/Dashboard/FindNewActivity/FindNewActivity";
import TodaysActivities from "./pages/Dashboard/TodaysActivities/TodaysActivities";
import PastActivities from "./pages/Dashboard/PastActivities/PastActivities";

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <ActivitiesProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />

              <Route path="/seeAllActivities" element={<SeeAllActivities />} />
              <Route path="/login" element={<Login />} />

              <Route element={<LoginRequired />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route
                    path="todays-activities"
                    element={<TodaysActivities />}
                  />
                  <Route path="find-activity" element={<FindNewActivity />} />
                  <Route path="past-activities" element={<PastActivities />} />
                </Route>
              </Route>
            </Routes>
          </ActivitiesProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
