import React, { useEffect, useState } from "react";
import { Grid, Container, Loader, Flex, Select } from "@mantine/core";
import { useDispatch } from "react-redux";
import { SortAscending } from "@phosphor-icons/react";
import CustomBreadcrumbs from "../../../../components/Breadcrumbs.jsx";
import ModuleTabs from "../../../../components/moduleTabs.jsx";
import SubmitNewApplication from "./ApplicantSubmit.jsx";
import ApplicantDashboard from "./ApplicantDashboard.jsx";
import ViewApplicationsPage from "./ApplicationView.jsx";
import SavedDraftsPage from "./ApplicationDraft.jsx";
import NotificationsPage from "./ApplicantNotifications";
import ApplicationForm from "./ApplicationForm.jsx";
import IPFilingForm from "./IPFilingForm.jsx";

const categories = ["Most Recent", "Tags", "Title"];

function ApplicantMainDashboard() {
  const [activeTab, setActiveTab] = useState("0");
  const [sortedBy, setSortedBy] = useState("Most Recent");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Define your tabs here
  const tabItems = [
    { title: "Dashboard" },
    { title: "Submit New Application" },
    { title: "View Applications" },
    { title: "Saved Drafts" },
    { title: "Notifications" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return console.error("No authentication token found!");

      try {
        setLoading(true);
        // Fetch data logic here if needed
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <CustomBreadcrumbs />
      <Flex justify="space-between" align="center" mt="lg">
        <ModuleTabs
          tabs={tabItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          badges={[]}
        />

        <Flex align="center" mt="md" rowGap="1rem" columnGap="4rem" wrap="wrap">
          <Select
            classNames={{
              option: "select-options",
              input: "select-inputs",
            }}
            variant="filled"
            leftSection={<SortAscending />}
            data={categories}
            value={sortedBy}
            onChange={setSortedBy}
            placeholder="Sort By"
          />
        </Flex>
      </Flex>

      {/* Render content based on the active tab */}
      <Grid mt="xl">
        {loading ? (
          <Container py="xl">
            <Loader size="lg" />
          </Container>
        ) : (
          <>
            {activeTab === "0" && (
              <ApplicantDashboard setActiveTab={setActiveTab} />
            )}
            {activeTab === "1" && (
              <SubmitNewApplication setActiveTab={setActiveTab} />
            )}
            {activeTab === "1.1" && (
              <ApplicationForm setActiveTab={setActiveTab} />
            )}
            {activeTab === "2" && (
              <ViewApplicationsPage setActiveTab={setActiveTab} />
            )}
            {activeTab === "2.1" && (
              <IPFilingForm setActiveTab={setActiveTab} />
            )}
            {activeTab === "3" && (
              <SavedDraftsPage setActiveTab={setActiveTab} />
            )}
            {activeTab === "4" && (
              <NotificationsPage setActiveTab={setActiveTab} />
            )}
          </>
        )}
      </Grid>
    </>
  );
}

export default ApplicantMainDashboard;
