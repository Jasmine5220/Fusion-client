// PatentRoutes.jsx
import { Route, Routes } from "react-router-dom";
import { Layout } from "../../../components/layout";

// Applicant-related imports
import ApplicantMainDashboard from "../components/Applicant/ApplicantMainDashboard";
import ApplicantDashboard from "../components/Applicant/ApplicantDashboard";
import ViewApplicationsPage from "../components/Applicant/ApplicationView";
import SavedDraftsPage from "../components/Applicant/ApplicationDraft";
import SubmitNewApplication from "../components/Applicant/ApplicantSubmit";
import NotificationsPage from "../components/Applicant/ApplicantNotifications";
import IPFilingForm from "../components/Applicant/IPFilingForm";
import ApplicationForm from "../components/Applicant/ApplicationForm";
import StatusView from "../components/Applicant/StatusView";

// Director-related imports
import DirectorMainDashboard from "../components/Director/DirectorMainDashboard";
import DirectorDashboard from "../components/Director/DirectorDashboard";
import PendingReviewsView from "../components/Director/PendingReviews.jsx";
import ReviewedApplications from "../components/Director/ReviewedApplications.jsx";
import ActiveApplications from "../components/Director/ActiveApplications";
import DirectorNotifications from "../components/Director/DirectorNotifications.jsx";
import SubmittedApplications from "../components/Director/SubmittedApplications.jsx";
import DirectorAccept from "../components/Director/Accept.jsx";
import RecentsView from "../components/Director/RecentsView.jsx";

// PCCAdmin-related imports
import PCCAdminMainDashboard from "../components/PCCAdmin/PCCAdminMainDashboard";
// import FeedbackViewer from "../components/PCCAdmin/FeedbackViewer.jsx";
// import ForwardToDirector from "../components/PCCAdmin/ForwardToDirector.jsx";
import ManageAttorney from "../components/PCCAdmin/ManageAttorneyAssignment.jsx";
import DirectorStatusView from "../components/Director/StatusView";
import ReviewAppComponent from "../components/PCCAdmin/ReviewComponent.jsx";
// import ForwardDetails from "../components/PCCAdmin/ForwardDetails.jsx";
import DownloadsPage from "../components/PCCAdmin/DownloadsPage.jsx";
import InsightsPage from "../components/PCCAdmin/InsightsPage.jsx";
// import PCCAdminDashboard from './components/PCCAdmin/PCCAdminDashboard';
// import ReviewApplication from './components/PCCAdmin/ReviewApplication';
// import AttorneyDetails from "./components/PCCAdmin/AttorneyDetails";
// eslint-disable-next-line import/no-unresolved
// import ManageAttorney from "./components/PCCAdmin/ManageAttorney";
// eslint-disable-next-line import/no-unresolved
import NotifyApplicant from "../components/PCCAdmin/NotifyApplicant";
import PCCAdminDashboard from "../components/PCCAdmin/PCCAdminDashboard.jsx";
import PCCAdminStatusView from "../components/PCCAdmin/PCCAStatusView.jsx";
// import PCCAdminMainDashboard from "../components/PCCAdmin/PCCAdminMainDashboard";
// import PCCAdminDashboard from '../components/PCCAdmin/PCCAdminDashboard';
// import ReviewApplication from '../components/PCCAdmin/ReviewApplication';
// import AttorneyDetails from "../components/PCCAdmin/AttorneyDetails";
// import ManageAttorney from "../components/PCCAdmin/ManageAttorney";

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
        path="/applicant/"
        element={
          <Layout>
            <ApplicantMainDashboard />
          </Layout>
        }
      />
      <Route
        path="/applicant/applications/"
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
        path="/applicant/applications/submitted"
        element={
          <Layout>
            <IPFilingForm />
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
        path="/director"
        element={
          <Layout>
            <DirectorMainDashboard />
          </Layout>
        }
      />
      <Route
        path="/director-dashboard"
        element={
          <Layout>
            <DirectorDashboard />
          </Layout>
        }
      />
      <Route
        path="/director/accept_reject"
        element={
          <Layout>
            <DirectorAccept />
          </Layout>
        }
      />
      <Route
        path="/director/recents"
        element={
          <Layout>
            <RecentsView />
          </Layout>
        }
      />
      <Route
        path="/director/pending-reviews"
        element={
          <Layout>
            <PendingReviewsView />
          </Layout>
        }
      />
      <Route
        path="/director/reviewedapplications"
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
      <Route
        path="/director/final-review/details"
        element={
          <Layout>
            <DirectorStatusView />
          </Layout>
        }
      />
      <Route
        path="/director/notifications/"
        element={
          <Layout>
            <DirectorNotifications />
          </Layout>
        }
      />
      <Route
        path="/director/submitted-applications"
        element={
          <Layout>
            <SubmittedApplications />
          </Layout>
        }
      />

      {/* PCCAdmin-related routes */}
      <Route
        path="/pccAdmin/"
        element={
          <Layout>
            <PCCAdminMainDashboard />
          </Layout>
        }
      />
      <Route
        path="/pccAdmin/dashboard"
        element={
          <Layout>
            <PCCAdminDashboard />
          </Layout>
        }
      />
      <Route
        path="/pccAdmin/reviewed-applications"
        element={
          <Layout>
            <ReviewAppComponent />
          </Layout>
        }
      />

      <Route
        path="/pccAdmin/manageAttorney"
        element={
          <Layout>
            <ManageAttorney />
          </Layout>
        }
      />
      <Route
        path="/pccAdmin/notifyApplicant"
        element={
          <Layout>
            <NotifyApplicant />
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
        path="/pccAdmin/downloads"
        element={
          <Layout>
            <DownloadsPage />
          </Layout>
        }
      />
      <Route
        path="/pccAdmin/insights"
        element={
          <Layout>
            <InsightsPage />
          </Layout>
        }
      />

      <Route
        path="/pccAdmin/application/view-details"
        element={
          <Layout>
            <PCCAdminStatusView />
          </Layout>
        }
      />
    </Routes>
  );
}
