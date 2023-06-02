import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.js";
import AuthRoute from "./protected-routes/AuthRoute.js";
import InitialLayout from "./components/layout/InitialLayout.js";
import Auth from "./pages/Auth.js";
import AuthLayout from "./components/layout/AuthLayout.js";
import RequstToken from "./pages/RequstToken.js";
import DashboardLayout from "./components/layout/DashboardLayout.js";
import AdminDashboard from "./pages/admin/AdminDashboard.js";
import VerifyEmail from "./pages/VerifyEmail.js";
import ResetPassword from "./pages/ResetPassword.js";
import OngoingStays from "./pages/user/OngoingStays.js";
import UpdateStay from "./pages/user/UpdateStay.js";
import PreviousStays from "./pages/user/PreviousStays.js";
import ViewOngoingStays from "./pages/admin/ViewOngoingStays.js";
import AdminRoute from "./protected-routes/AdminRoute.js";
import UserRoute from "./protected-routes/UserRoute.js";
import NotFound from "./pages/NotFound.js";
import CurrentRequest from "./pages/user/CurrentRequest.js";
import CreateRequest from "./pages/user/CreateRequest.js";
import UpdateRequests from "./pages/admin/UpdateRequests.js";
import Reports from "./pages/user/Reports.js";
import AdminReports from "./pages/admin/AdminReports.js";
import RequestedUpdates from "./pages/user/RequestedUpdates.js";
import RejectedRequests from "./pages/user/RejectedRequests.js";
import ViewRejectedRequests from "./pages/admin/ViewRejectedRequests.js";
import Livechat from "./components/LiveChat.js";
import { useSelector } from "react-redux";
import ManageUsers from "./pages/admin/ManageUsers.js";
import ManageProfile from "./pages/ManageProfile.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
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
              path="/dashboard/admin/requested-updates"
              element={<AdminRoute Component={UpdateRequests} />}
            />
            <Route
              path="/dashboard/admin/deferred-requests"
              element={<AdminRoute Component={ViewRejectedRequests} />}
            />
            <Route
              path="/dashboard/admin/manage-users"
              element={<AdminRoute Component={ManageUsers} />}
            />
            <Route
              path="/dashboard/admin/manage-profile"
              element={<AdminRoute Component={ManageProfile} />}
            />
            <Route
              path="/dashboard/admin/reports"
              element={<AdminRoute Component={AdminReports} />}
            />
            <Route
              path="/dashboard/user"
              element={<UserRoute Component={CurrentRequest} />}
            />
            <Route
              path="/dashboard/user/create-request"
              element={<UserRoute Component={CreateRequest} />}
            />
            <Route
              path="/dashboard/user/current-requests"
              element={<UserRoute Component={CurrentRequest} />}
            />
            <Route
              path="/dashboard/user/manage-profile"
              element={<UserRoute Component={ManageProfile} />}
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
              path="/dashboard/user/requested-updates"
              element={<UserRoute Component={RequestedUpdates} />}
            />
            <Route
              path="/dashboard/user/deferred-requests"
              element={<UserRoute Component={RejectedRequests} />}
            />
            <Route
              path="/dashboard/user/previous-stays"
              element={<UserRoute Component={PreviousStays} />}
            />
            <Route
              path="/dashboard/user/reports"
              element={<UserRoute Component={Reports} />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {isAuthenticated && user?.userData?.role === "user" && <Livechat />}
    </div>
  );
}

export default App;
