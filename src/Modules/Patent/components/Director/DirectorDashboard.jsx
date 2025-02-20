import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Box,
  Text,
  Divider,
  Button,
  Container,
  Progress,
  Table,
  ScrollArea,
} from "@mantine/core";
import {
  ClipboardText,
  CheckCircle,
  ArrowCircleDown,
  Eye,
  Briefcase,
  Clock,
  ChartBar,
  Building,
} from "@phosphor-icons/react";
import "../../style/Director/DirectorDashboard.css";
import downloadsData from "../../data/director/DownloadData";

const TabKeys = {
  NEW_APPLICATIONS: "1",
  REVIEWED_APPLICATIONS: "2",
};

function validateURL(url) {
  try {
    return new URL(url).href;
  } catch (error) {
    console.error("Invalid URL:", url);
    return "#"; // Fallback for invalid URLs
  }
}

function DirectorDashboard({ setActiveTab }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Screen size threshold for mobile
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateProgressSections = () => {
    const stages = ["Pending Review", "Reviewed", "Final Decision"];
    const values = [33.3, 33.3, 33.4];
    const colors = ["blue", "#b3cde0", "#003366"];

    return stages.map((_, index) => ({
      value: values[index],
      color: colors[index],
    }));
  };

  const featuresData = [
    {
      icon: <Eye size={28} className="feature-icon" />,
      title: "Application Management and Review",
      description:
        "Track and review patent applications, view submission details, and monitor status updates.",
    },
    {
      icon: <Briefcase size={28} className="feature-icon" />,
      title: "Attorney Feedback and Communication",
      description:
        "Integrate feedback from attorneys, facilitate communication, and track application history.",
    },
    {
      icon: <Clock size={28} className="feature-icon" />,
      title: "Transparent Record-Keeping and Status Visibility",
      description:
        "Real-time status updates, detailed history tracking, and archive functionality.",
    },
    {
      icon: <ChartBar size={28} className="feature-icon" />,
      title: "Dashboard Analytics and Insights",
      description:
        "Analyze application volume, performance metrics, and trends to support data-driven decisions.",
    },
  ];

  return (
    <div className="director-dashboard">

    <Box>
      {/* Page Title */}
      <Text className="title-dashboard">Director Dashboard</Text>

      {/* Content Below Title */}
      <Container className="content-container">
        {/* Feature Description */}
        <Text mt="sm" mb="lg" className="feature-text">
          Welcome to the Director Dashboard. Here, you can manage and monitor the
          review process for patent applications. Access resources and track
          workflow progress to ensure smooth operation.
        </Text>

        {/* Feature Points */}
        <Box className="feature-box-container">
          <Grid>
            {featuresData.map((feature, index) => (
              <Grid.Col span={12} key={index}>
                <Box className="feature-box-with-hover">
                  {feature.icon}
                  <Text>
                    <span className="feature-box-title">{feature.title}: </span>
                    {feature.description}
                  </Text>
                </Box>
              </Grid.Col>
            ))}
          </Grid>
        </Box>

        {/* Application Workflow */}
        <Container className="workflow-container">
  <Text className="section-title" align="center" mb="lg">
    Application Workflow
  </Text>

  {/* Horizontal Progress Bar for Larger Screens */}
  <Box className="status-progress-container" display={{ base: "none", sm: "block" }}>
    <Progress
      size="xl"
      radius="lg"
      sections={calculateProgressSections()}
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
        { label: "Pending Review", color: "#b3cde0" },
        { label: "Reviewed", color: "#8cb3d9" },
        { label: "Final Decision", color: "#003366" },
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
      {["Pending Review", "Reviewed", "Final Decision"].map((label, index) => (
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

  {/* Vertical Progress Bar for Mobile Screens */}
  <Box className="mobile-progress-container" display={{ base: "flex", sm: "none" }}>
    <Box className="mobile-progress-bar">
      <Progress
        size="xl"
        radius="lg"
        sections={calculateProgressSections()}
        orientation="vertical"
        style={{ height: "300px" }}
      />
    </Box>
    <Box className="mobile-progress-labels">
      {[
        { label: "Pending Review", color: "#b3cde0" },
        { label: "Reviewed", color: "#8cb3d9" },
        { label: "Final Decision", color: "#003366" },
      ].map((step, index) => (
        <Box key={index} className="mobile-progress-label">
          <Box
            className="mobile-progress-dot"
            style={{ backgroundColor: step.color }}
          />
          <Text>{step.label}</Text>
        </Box>
      ))}
    </Box>
  </Box>
</Container>

        {/* Downloads && Documents Table */}
        <Container mt="lg" className="downloads-container">
          <Text className="section-title">Download Resources</Text>
          <ScrollArea>
            <Table className="downloads-table">
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
                        href={validateURL(download.link)}
                        target="_blank"
                        className="download-button-table"
                      >
                        <ArrowCircleDown size={16} style={{ marginRight: "8px" }} />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ScrollArea>
        </Container>
      </Container>

      {/* Dashboard Sections */}
      <Grid mt="xl" className="dashboard-grid">
        {/* New Applications */}
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Box className="dashboard-cards">
            <Text className="dashboard-card-title">
              <ClipboardText size={20} className="icon" /> New Applications
            </Text>
            <Divider className="card-divider" />
            <Text size="sm" mt="sm">
              View all applications forwarded by PCC Admin for your review.
            </Text>
            <Button
              variant="outline"
              fullWidth
              mt="md"
              size="sm"
              onClick={() => setActiveTab(TabKeys.NEW_APPLICATIONS)}
              className="markReadButton"
            >
              View Submitted Applications
            </Button>
          </Box>
        </Grid.Col>

        {/* Reviewed Applications */}
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Box className="dashboard-cards">
            <Text className="dashboard-card-title">
              <CheckCircle size={20} className="icon" /> Reviewed Applications
            </Text>
            <Divider className="card-divider" />
            <Text size="sm" mt="sm">
              Access applications that have been reviewed.
            </Text>
            <Button
              variant="outline"
              fullWidth
              mt="md"
              size="sm"
              onClick={() => setActiveTab(TabKeys.REVIEWED_APPLICATIONS)}
              className="markReadButton"
            >
              View Reviewed Applications
            </Button>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
    </div>

  );
}

DirectorDashboard.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
};

export default DirectorDashboard;