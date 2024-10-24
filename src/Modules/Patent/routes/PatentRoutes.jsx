// PatentRoutes.jsx
import { Route, Routes } from "react-router-dom";
import { Layout } from "../../../components/layout";

// Applicant-related imports
import ApplicantDashboard from "../components/Applicant/ApplicantDashboard";
import ViewApplicationsPage from "../components/Applicant/ApplicationView";
import SavedDraftsPage from "../components/Applicant/ApplicationDraft";
import SubmitNewApplication from "../components/Applicant/ApplicantSubmit";
import NotificationsPage from "../components/Applicant/ApplicantNotifications";
import ApplicationForm from "../components/Applicant/ApplicationForm";
import StatusView from "../components/Applicant/StatusView";

// Director-related imports
import DirectorDashboard from "../components/Director/DirectorDashboard";
import RecentApplications from "../components/Director/RecentApplications";
import FinalReviewApplications from "../components/Director/FinalReviewApplications";
import ReviewedApplications from "../components/Director/ReviewedApplications";
import ActiveApplications from "../components/Director/ActiveApplications";

// PCCAdmin-related imports
// import PCCAdminDashboard from './components/PCCAdmin/PCCAdminDashboard';
// import ReviewApplication from './components/PCCAdmin/ReviewApplication';
// import AttorneyDetails from "./components/PCCAdmin/AttorneyDetails";
// import ManageAttorney from "./components/PCCAdmin/ManageAttorney";

export default function PatentRoutes() {
  return (
    <Routes>
      {/* Applicant-related routes */}
      <Route
        path="/applicant/dashboard"
        element={
          <Layout>
            <ApplicantDashboard />
          </Layout>
        }
      />
      <Route
        path="/applicant/applications"
        element={
          <Layout>
            <ViewApplicationsPage />
          </Layout>
        }
      />
      <Route
        path="/applicant/drafts"
        element={
          <Layout>
            <SavedDraftsPage />
          </Layout>
        }
      />
      <Route
        path="/applicant/applications/submit"
        element={
          <Layout>
            <SubmitNewApplication />
          </Layout>
        }
      />
      <Route
        path="/applicant/notifications"
        element={
          <Layout>
            <NotificationsPage />
          </Layout>
        }
      />
      <Route
        path="/applicant/applications/submit/new"
        element={
          <Layout>
            <ApplicationForm />
          </Layout>
        }
      />
      <Route
        path="/applicant/applications/status-view"
        element={
          <Layout>
            <StatusView />
          </Layout>
        }
      />

      {/* Director-related routes */}
      <Route
        path="/director-dashboard"
        element={
          <Layout>
            <DirectorDashboard />
          </Layout>
        }
      />
      <Route
        path="/director/recent"
        element={
          <Layout>
            <RecentApplications />
          </Layout>
        }
      />
      <Route
        path="/director/final-review"
        element={
          <Layout>
            <FinalReviewApplications />
          </Layout>
        }
      />
      <Route
        path="/director/reviewed"
        element={
          <Layout>
            <ReviewedApplications />
          </Layout>
        }
      />
      <Route
        path="/director/active"
        element={
          <Layout>
            <ActiveApplications />
          </Layout>
        }
      />

      {/* PCCAdmin-related routes */}
      {/* <Route                      
        path="/pccAdmin/dashboard"
        element={
          <Layout>
            <PCCAdminDashboard />
          </Layout>
        }
      />
      <Route
        path="/pccAdmin/attorney_details"
        element={
          <Layout>
            <AttorneyDetails />
          </Layout>
        }
      />
      <Route
        path="/pccAdmin/manage_attorney"
        element={
          <Layout>
            <ManageAttorney />
          </Layout>
        }
      />
      <Route
        path="/pccAdmin/review_application"
        element={
          <Layout>
            <ReviewApplication />
          </Layout>
        }
      /> */}
    </Routes>
  );
}
