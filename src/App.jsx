import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { Layout } from "./components/layout";
import Dashboard from "./Modules/Dashboard/dashboardNotifications";
import Profile from "./Modules/Profile/profile";
import LoginPage from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import AcademicPage from "./Modules/Academic/index";
import ValidateAuth from "./helper/validateauth";
import NotificationsPage from "./Modules/Patent/components/Applicant/ApplicantNotifications";
import SubmitNewApplication from "./Modules/Patent/components/Applicant/ApplicantSubmit";
import ApplicantDashboard from "./Modules/Patent/components/Applicant/ApplicantDashboard";
import ViewApplicationsPage from "./Modules/Patent/components/Applicant/ApplicationView";
import SavedDraftsPage from "./Modules/Patent/components/Applicant/ApplicationDraft";
import ApplicationForm from "./Modules/Patent/components/Applicant/ApplicationForm";
import StatusView from "./Modules/Patent/components/Applicant/StatusView";

export default function App() {
  const location = useLocation();
  return (
    <MantineProvider>
      <Notifications
        position="top-right"
        zIndex={1000}
        autoClose={2000}
        limit={1}
      />
      {location.pathname !== "/accounts/login" &&
        location.pathname !== "/reset-password" && <ValidateAuth />}
      <Routes>
        <Route path="/" element={<Navigate to="/accounts/login" replace />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/academics"
          element={
            <Layout>
              <AcademicPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/applicantdashboard"
          element={
            <Layout>
              <ApplicantDashboard />
            </Layout>
          }
        />
        <Route
          path="/viewapplicationspage"
          element={
            <Layout>
              <ViewApplicationsPage />
            </Layout>
          }
        />
        <Route
          path="/saveddraftspage"
          element={
            <Layout>
              <SavedDraftsPage />
            </Layout>
          }
        />
        <Route
          path="/submitnewapplication"
          element={
            <Layout>
              <SubmitNewApplication />
            </Layout>
          }
        />
        <Route
          path="/notifications"
          element={
            <Layout>
              <NotificationsPage />
            </Layout>
          }
        />
        <Route
          path="/applicationform"
          element={
            <Layout>
              <ApplicationForm />
            </Layout>
          }
        />
        <Route
          path="/status-view"
          element={
            <Layout>
              <StatusView />
            </Layout>
          }
        />
        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Routes>
    </MantineProvider>
  );
}
