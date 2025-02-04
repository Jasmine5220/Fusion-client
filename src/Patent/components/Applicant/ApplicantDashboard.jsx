import React from "react";
import {
  Grid,
  Box,
  Text,
  Divider,
  Button,
  Container,
  Progress,
} from "@mantine/core";
import {
  ClipboardText,
  FilePlus,
  Archive,
  Bell,
  ArrowCircleDown,
} from "@phosphor-icons/react";
import "../../style/Applicant/ApplicantDashboard.css";

// eslint-disable-next-line react/prop-types
function ApplicantDashboard({ setActiveTab }) {
  const downloadsData = [
    {
      id: 1,
      title: "Intellectual Property Filing Form",
      link: "https://www.iiitdmj.ac.in/rspc.iiitdmj.ac.in/DRSPC/IPRM/Annexure%20I.pdf",
    },
    {
      id: 2,
      title: "Request for Provisional Patent Filing",
      link: "https://www.iiitdmj.ac.in/rspc.iiitdmj.ac.in/DRSPC/IPRM/Annexure%20II.pdf",
    },
    {
      id: 3,
      title: "Intellectual Property Policy Document",
      link: "https://www.iiitdmj.ac.in/downloads/IPR%20Policy%20Final%20V1%2016_6_2020.pdf",
    },
  ];

  return (
    <Box>
      {/* Page Title */}
      <Text className="title-dashboard">Applicant Dashboard</Text>

      {/* Content Below Title */}
      <Container className="content-container">
        {/* Feature Description */}
        <Text mt="sm" mb="lg" className="feature-text">
          Welcome to the Applicant Dashboard. Here, you can manage your
          applications, track their status, and access important resources.
          Follow the workflow below for a seamless patent application process.
        </Text>

        {/* Feature Points */}
        <Box className="feature-box-container">
          <Grid>
            <Grid.Col span={12}>
              <Box className="feature-box-with-hover">
                <ClipboardText size={28} className="feature-icon" />
                <Text>
                  <span className="feature-box-title">
                    Track Applications:{" "}
                  </span>
                  Monitor the status of your patent applications in real time.
                </Text>
              </Box>
            </Grid.Col>
            <Grid.Col span={12}>
              <Box className="feature-box-with-hover">
                <FilePlus size={28} className="feature-icon" />
                <Text>
                  <span className="feature-box-title">Seamless Workflow: </span>
                  Follow a step-by-step guide for completing your application
                  process.
                </Text>
              </Box>
            </Grid.Col>
            <Grid.Col span={12}>
              <Box className="feature-box-with-hover">
                <Archive size={28} className="feature-icon" />
                <Text>
                  <span className="feature-box-title">Resources Access: </span>
                  Access all necessary resources, including guidelines and
                  documents.
                </Text>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
        {/* Application Workflow */}
        <Container className="workflow-container">
          <Text className="section-title" align="center" mb="lg">
            Application Workflow
          </Text>
          <Box
            className="status-progress-container"
            style={{ position: "relative" }}
          >
            {/* Progress Bar */}
            <Progress
              size="xl"
              radius="lg"
              sections={[
                { value: 14.3, color: "blue" },
                { value: 14.3, color: "#b3cde0" },
                { value: 14.3, color: "#8cb3d9" },
                { value: 14.3, color: "#6699cc" },
                { value: 14.3, color: "#336699" },
                { value: 14.3, color: "#003366" },
                { value: 14.2, color: "black" },
              ]}
              mt="md"
            />
            {/* Dots */}
            <Box
              style={{
                position: "absolute",
                top: "40%",
                left: "0",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                transform: "translateY(-50%)",
              }}
            >
              {[
                { label: "Submitted", color: "#b3cde0" },
                { label: "PCCAdmin", color: "#8cb3d9" },
                { label: "Attorney Assignment", color: "#6699cc" },
                { label: "Director's Approval", color: "#336699" },
                { label: "Patentability Check", color: "blue" },
                { label: "Search Report", color: "#003366" },
                { label: "Patent Filed", color: "black" },
              ].map((step, index) => (
                <Box key={index} style={{ flex: 1, textAlign: "center" }}>
                  <Box
                    style={{
                      height: "14px",
                      width: "14px",
                      backgroundColor: step.color,
                      borderRadius: "50%",
                      margin: "0 auto",
                      marginBottom: "8px",
                      border: "2px solid white",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </Box>
              ))}
            </Box>
            {/* Labels Below Bar */}
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "16px",
              }}
            >
              {[
                "Submitted",
                "PCCAdmin",
                "Attorney Assignment",
                "Director's Approval",
                "Patentability Check",
                "Search Report",
                "Patent Filed",
              ].map((label, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#1a202c",
                    textAlign: "center",
                    flex: 1,
                  }}
                >
                  {label}
                </Text>
              ))}
            </Box>
          </Box>
        </Container>

        {/* Downloads && Documents Table */}
        <Container mt="lg" className="downloads-container">
          <Text className="section-title">Download Forms and Documents</Text>
          <table className="downloads-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Document Title</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {downloadsData.map((download, index) => (
                <tr key={download.id}>
                  <td>{index + 1}</td>
                  <td>{download.title}</td>
                  <td>
                    <Button
                      component="a"
                      href={download.link}
                      target="_blank"
                      className="download-button-table"
                    >
                      <ArrowCircleDown
                        size={16}
                        style={{ marginRight: "8px" }}
                      />
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </Container>

      {/* Dashboard Sections */}
      <Grid mt="xl" className="dashboard-grid">
        {/* Submit New Application */}
        <Grid.Col span={6}>
          <Box className="dashboard-cards">
            <Text className="dashboard-card-title">
              <FilePlus size={20} className="icon" /> Submit New Application
            </Text>
            <Divider className="card-divider" />
            <Text size="sm" mt="sm">
              Begin the process of filing a new patent application with our
              guided form.
            </Text>
            <Button
              variant="outline"
              fullWidth
              mt="md"
              size="sm"
              onClick={() => setActiveTab("1")}
              className="markReadButton"
            >
              Start Application
            </Button>
          </Box>
        </Grid.Col>

        {/* View Applications */}
        <Grid.Col span={6}>
          <Box className="dashboard-cards">
            <Text className="dashboard-card-title">
              <ClipboardText size={20} className="icon" /> View Applications
            </Text>
            <Divider className="card-divider" />
            <Text size="sm" mt="sm">
              Monitor the progress and status of all your submitted patent
              applications.
            </Text>
            <Button
              variant="outline"
              fullWidth
              mt="md"
              size="sm"
              onClick={() => setActiveTab("2")}
              className="markReadButton"
            >
              View Applications
            </Button>
          </Box>
        </Grid.Col>

        {/* Saved Drafts */}
        <Grid.Col span={6}>
          <Box className="dashboard-cards">
            <Text className="dashboard-card-title">
              <Archive size={20} className="icon" /> Saved Drafts
            </Text>
            <Divider className="card-divider" />
            <Text size="sm" mt="sm">
              Continue working on applications you have saved as drafts.
            </Text>
            <Button
              variant="outline"
              fullWidth
              mt="md"
              size="sm"
              onClick={() => setActiveTab("3")}
              className="markReadButton"
            >
              Resume Draft
            </Button>
          </Box>
        </Grid.Col>

        {/* Notifications */}
        <Grid.Col span={6}>
          <Box className="dashboard-cards">
            <Text className="dashboard-card-title">
              <Bell size={20} className="icon" /> Notifications
            </Text>
            <Divider className="card-divider" />
            <Text size="sm" mt="sm">
              Stay updated with the latest notifications regarding your patent
              applications.
            </Text>
            <Button
              variant="outline"
              fullWidth
              mt="md"
              size="sm"
              onClick={() => setActiveTab("4")}
              className="markReadButton"
            >
              View Notifications
            </Button>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default ApplicantDashboard;
