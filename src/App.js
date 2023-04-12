import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Dashboard from "./pages/Dashboard.js";
import LandingPage from "./pages/LandingPage.js";
import AuthRoute from "./protected-routes/AuthRoute.js";
import InitialLayout from "./components/layout/InitialLayout.js";
import Auth from "./pages/Auth.js";
import AuthLayout from "./components/layout/AuthLayout.js";
import RequstToken from "./pages/RequstToken.js";
import DashboardLayout from "./components/layout/DashboardLayout.js";
import AdminDashboard from "./pages/admin/AdminDashboard.js";
import UserDashboard from "./pages/user/UserDashboard.js";
import VerifyEmail from "./pages/VerifyEmail.js";
import ResetPassword from "./pages/ResetPassword.js";
// import UserDashboard from "./pages/user/UserDashboard.js"
import Payment from "./pages/user/Payment.js";
import OngoingStays from "./pages/user/OngoingStays.js";
import UpdateStay from "./pages/user/UpdateStay.js";
import PreviousStays from "./pages/user/PreviousStays.js";
import ViewOngoingStays from "./pages/admin/ViewOngoingStays.js";
import AdminRoute from "./protected-routes/AdminRoute.js";
import UserRoute from "./protected-routes/UserRoute.js";
import NotFound from "./pages/NotFound.js";
import CurrentRequest from "./pages/user/CurrentRequest.js";
// import * as dotenv from "dotenv";
// dotenv.config();
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InitialLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/requestToken" element={<RequstToken />} />
              <Route path="/auth/forgot-password" element={<RequstToken />} />
              <Route
                path="/auth/verifyEmail/:email"
                element={<VerifyEmail />}
              />
              <Route
                path="/auth/resetPassword/:email"
                element={<ResetPassword />}
              />
            </Route>
          </Route>
          <Route
            path="/dashboard"
            element={<AuthRoute Component={DashboardLayout} />}
          >
            <Route
              path="/dashboard/admin"
              element={<AdminRoute Component={AdminDashboard} />}
            />
            <Route
              path="/dashboard/admin/ongoing-stays"
              element={<AdminRoute Component={ViewOngoingStays} />}
            />
            <Route
              path="/dashboard/user"
              element={<UserRoute Component={CurrentRequest} />}
            />
            <Route
              path="/dashboard/user/payment"
              element={<UserRoute Component={Payment} />}
            />
            <Route
              path="/dashboard/user/ongoing-stays"
              element={<UserRoute Component={OngoingStays} />}
            />
            <Route
              path="/dashboard/user/update-stay"
              element={<UserRoute Component={UpdateStay} />}
            />
            <Route
              path="/dashboard/user/previous-stays"
              element={<UserRoute Component={PreviousStays} />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
