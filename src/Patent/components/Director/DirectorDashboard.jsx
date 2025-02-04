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

function DirectorDashboard({
  setActiveTab,
  headerText = "Patent & Copyright Cell Dashboard",
}) {
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
      icon: <Eye size={20} className="feature-icon" />,
      title: "Application Management and Review",
      description:
        "Track and review patent applications, view submission details, and monitor status updates.",
    },
    {
      icon: <Briefcase size={20} className="feature-icon" />,
      title: "Attorney Feedback and Communication",
      description:
        "Integrate feedback from attorneys, facilitate communication, and track application history.",
    },
    {
      icon: <Clock size={20} className="feature-icon" />,
      title: "Transparent Record-Keeping and Status Visibility",
      description:
        "Real-time status updates, detailed history tracking, and archive functionality.",
    },
    {
      icon: <ChartBar size={20} className="feature-icon" />,
      title: "Dashboard Analytics and Insights",
      description:
        "Analyze application volume, performance metrics, and trends to support data-driven decisions.",
    },
    {
      icon: <ArrowCircleDown size={20} className="feature-icon" />,
      title: "Download Important Documents and Forms",
      description:
        "Quick and easy access to important documents and forms for offline use.",
    },
    {
      icon: <ArrowCircleDown size={20} className="feature-icon" />,
      title: "Insights",
      description: "See past years' applications data.",
    },
  ];

  const renderFeatureItems = () =>
    featuresData.map((feature, index) => (
      <Box key={index} className="feature-item">
        <Box className="icon-and-title">
          {feature.icon}
          <Text className="feature-title">
            <strong>{feature.title}</strong>
          </Text>
        </Box>
        {!isMobile && (
          <Text className="feature-description">{feature.description}</Text>
        )}
      </Box>
    ));

  return (
    <Box className="dashboard-container">
      <header className="header">{headerText}</header>
      <Container className="content-container">
        <Text className="overview-title">
          IIITDM Jabalpur's Patent System{" "}
          <Building size={24} className="overview-icon" />
        </Text>
        <Text className="overview-text">
          The Patent Management System at IIITDM Jabalpur focuses on fostering
          research and development activities, particularly in IT-enabled design
          and manufacturing, as well as the design of IT systems.
        </Text>
        <Text className="overview-title">
          Overview <ChartBar size={24} className="overview-icon" />
        </Text>
        <Text className="feature-text" mt="sm" mb="lg">
          Welcome to the Director Dashboard. Here, you can manage and monitor
          the review process for patent applications. Access resources and track
          workflow progress to ensure smooth operation.
        </Text>

        <Container className="workflow-container">
          <Text className="section-title" align="center" mb="lg">
            Application Workflow
          </Text>
          <Box className="status-progress-container">
            <Progress
              size="xl"
              radius="lg"
              sections={calculateProgressSections()}
              mt="md"
            />
            <Box className="status-labels">
              {["Pending Review", "Reviewed", "Final Decision"].map(
                (label, index) => (
                  <Text key={index} className="status-label">
                    {label}
                  </Text>
                ),
              )}
            </Box>
          </Box>
          <Box className="features-list">{renderFeatureItems()}</Box>
        </Container>
      </Container>

      <Container mt="lg" className="downloads-container">
        <Text className="section-title">Download Resources</Text>
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
        </table>
      </Container>

      <Grid mt="xl" className="dashboard-grid">
        <Grid.Col xs={12} sm={6} lg={6}>
          <Box className="dashboard-card">
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
              onClick={() => setActiveTab(TabKeys.NEW_APPLICATIONS)}
              className="button-one"
            >
              View Submitted Applications
            </Button>
          </Box>
        </Grid.Col>

        <Grid.Col xs={12} sm={6} lg={6}>
          <Box className="dashboard-card">
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
              onClick={() => setActiveTab(TabKeys.REVIEWED_APPLICATIONS)}
              className="button-one"
            >
              View Reviewed Applications
            </Button>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

DirectorDashboard.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
  headerText: PropTypes.string,
};

export default DirectorDashboard;
