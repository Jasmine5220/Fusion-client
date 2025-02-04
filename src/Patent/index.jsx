import { useState, useRef } from "react";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import { Tabs, Button, Flex, Text } from "@mantine/core";
import CustomBreadcrumbs from "../../components/Breadcrumbs";
import classes from "../Dashboard/Dashboard.module.css";
import ApplicantDashboard from "./components/Applicant/ApplicantDashboard";
import ApplicationForm from "./components/Applicant/ApplicationForm";
import StatusView from "./components/Applicant/StatusView";
import AttorneyDetails from "./components/Applicant/AttorneyDetails";
import ModifyApplication from "./components/Applicant/ModifyApplication";
import PCCAdminDashboard from "./components/PCCAdmin/PCCAdminDashboard";
import ApplicationReview from "./components/PCCAdmin/ApplicationReview";
import NotifyApplicant from "./components/PCCAdmin/NotifyApplicant";
import ForwardToDirector from "./components/PCCAdmin/ForwardToDirector";
import ManageAttorneyAssignment from "./components/PCCAdmin/ManageAttorneyAssignment";
import DirectorDashboard from "./components/Director/DirectorDashboard";
import ReviewedApplication from "./components/Director/ReviewedApplications";
import RequestModifications from "./components/Director/RequestModifications";
import ApplicationView from "./components/Applicant/ApplicationView";
import DownloadsPage from "./components/PCCAdmin/DownloadsPage";
import InsightsPage from "./components/PCCAdmin/InsightsPage";

function PatentPage() {
  const [activeTab, setActiveTab] = useState("0");
  const tabsListRef = useRef(null);
  const tabItems = [
    { title: "Applicant Dashboard", component: <ApplicantDashboard /> },
    { title: "Application Form", component: <ApplicationForm /> },
    { title: "View Status", component: <StatusView /> },
    { title: "Attorney Details", component: <AttorneyDetails /> },
    { title: "Modify Application", component: <ModifyApplication /> },
    { title: "PCC Admin Dashboard", component: <PCCAdminDashboard /> },
    { title: "Review Application", component: <ApplicationReview /> },
    { title: "Notify Applicant", component: <NotifyApplicant /> },
    { title: "Forward to Director", component: <ForwardToDirector /> },
    { title: "Manage Attorney", component: <ManageAttorneyAssignment /> },
    { title: "Director Dashboard", component: <DirectorDashboard /> },
    { title: "Review Application", component: <ReviewedApplication /> },
    { title: "Request Modifications", component: <RequestModifications /> },
    { title: "ApplicationView", component: <ApplicationView /> },
    { title: "DownloadsPage", component: <DownloadsPage /> },
    { title: "InsightsPage", component: <InsightsPage /> },
  ];

  const handleTabChange = (direction) => {
    const newIndex =
      direction === "next"
        ? Math.min(+activeTab + 1, tabItems.length - 1)
        : Math.max(+activeTab - 1, 0);
    setActiveTab(String(newIndex));
    tabsListRef.current.scrollBy({
      left: direction === "next" ? 50 : -50,
      behavior: "smooth",
    });
  };

  return (
    <>
      <CustomBreadcrumbs />
      <Flex
        justify="flex-start"
        align="center"
        gap={{ base: "0.5rem", md: "1rem" }}
        mt={{ base: "1rem", md: "1.5rem" }}
        ml={{ md: "lg" }}
      >
        <Button
          onClick={() => handleTabChange("prev")}
          variant="default"
          p={0}
          style={{ border: "none" }}
        >
          <CaretCircleLeft
            className={classes.fusionCaretCircleIcon}
            weight="light"
          />
        </Button>

        <div className={classes.fusionTabsContainer} ref={tabsListRef}>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List style={{ display: "flex", flexWrap: "nowrap" }}>
              {tabItems.map((item, index) => (
                <Tabs.Tab
                  value={String(index)}
                  key={index}
                  className={
                    activeTab === String(index)
                      ? classes.fusionActiveRecentTab
                      : ""
                  }
                >
                  <Text>{item.title}</Text>
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </div>

        <Button
          onClick={() => handleTabChange("next")}
          variant="default"
          p={0}
          style={{ border: "none" }}
        >
          <CaretCircleRight
            className={classes.fusionCaretCircleIcon}
            weight="light"
          />
        </Button>
      </Flex>
      {tabItems[parseInt(activeTab, 10)].component}
    </>
  );
}

export default PatentPage;
