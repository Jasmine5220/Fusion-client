import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Box,
  Text,
  Divider,
  Button,
  Container,
  Title,
  Progress,
  Select,
  Table,
  ScrollArea,
  Paper,
} from "@mantine/core";
import {
  ClipboardText,
  CheckCircle,
  ArrowCircleDown,
  Eye,
  Clock,
  DownloadSimple,
  ChartBar,
  Buildings,
  Bell,
} from "@phosphor-icons/react";
import "../../../style/Director/DirectorDashboard.css";
import downloadsData from "../../../data/director/DownloadData";

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
  const [selectedYear, setSelectedYear] = useState("2021");

  const applicationsByYear = {
    2021: [
      { label: "Submitted", count: 100, color: "#0056b3" },
      { label: "Approved", count: 70, color: "#32cd32" },
      { label: "Under Review", count: 30, color: "#ff6347" },
    ],
    2022: [
      { label: "Submitted", count: 120, color: "#0056b3" },
      { label: "Approved", count: 80, color: "#32cd32" },
      { label: "Under Review", count: 40, color: "#ff6347" },
    ],
  };

  const applications = applicationsByYear[selectedYear] || [];
  const totalApplications = applications.reduce(
    (sum, app) => sum + app.count,
    0,
  );

  const handleDownload = () => {
    const csvContent = `Status,Count,Percentage\n${applications
      .map(
        (app) =>
          `${app.label},${app.count},${(
            (app.count / totalApplications) *
            100
          ).toFixed(2)}%`,
      )
      .join("\n")}`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Applications_${selectedYear}.csv`);
    link.click();
  };

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
    // {
    //   icon: <Briefcase size={28} className="feature-icon" />,
    //   title: "Attorney Feedback and Communication",
    //   description:
    //     "Integrate feedback from attorneys, facilitate communication, and track application history.",
    // },
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
      {/* Page Title */}
      <Text className="title-dashboard">Dashboard</Text>
      <Box>
        <Paper shadow="md" radius="lg" className="combined-section">
          {/* Content Below Title */}

          <Box className="overview-section">
            <Text className="overview-title">
              Patent Management System (PMS)
              <Buildings size={24} className="overview-icon" />
            </Text>
            <Text className="overview-text">
              The Patent Management System at IIITDM Jabalpur focuses on
              fostering research and development activities, particularly in
              IT-enabled design and manufacturing, as well as the design of IT
              systems. Manage and monitor the review process for patent
              applications. Access resources and track workflow progress to
              ensure smooth operation.
            </Text>
          </Box>

          <Divider my="xl" />

          {/* Feature Points */}
          <Box className="feature-box-container">
            <Grid>
              {featuresData.map((feature, index) => (
                <Grid.Col span={12} key={index}>
                  <Box className="feature-box-with-hover">
                    {feature.icon}
                    <Text>
                      <span className="feature-box-title">
                        {feature.title}:{" "}
                      </span>
                      {feature.description}
                    </Text>
                  </Box>
                </Grid.Col>
              ))}
            </Grid>
          </Box>

          <Divider my="xl" />

          {/* Application Workflow */}
          <Container className="workflow-container">
            <Text className="section-title" align="center" mb="lg">
              Application Workflow
            </Text>

            {/* Horizontal Progress Bar for Larger Screens */}
            <Box
              className="status-progress-container"
              display={{ base: "none", sm: "block" }}
            >
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
                  { label: "Proceed", color: "#003366" },
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
                {["Pending Review", "Reviewed", "Final Decision"].map(
                  (label, index) => (
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
                  ),
                )}
              </Box>
            </Box>

            {/* Vertical Progress Bar for Mobile Screens */}
            <Box
              className="mobile-progress-container"
              display={{ base: "flex", sm: "none" }}
            >
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

            <Divider my="xl" />

            {/* Downloads && Documents Table */}
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
              </Table>
            </ScrollArea>
          </Container>

          <Divider my="xl" />

          {/* Insights Section */}
            <Text className="section-title">
              Applications Overview - {selectedYear}
            </Text>
            <Text className="overview-text" mb={10}>
              Select a year from the dropdown below to view the statistics of
              applications for that year. You can also download the data as a
              CSV file for further analysis.
            </Text>

            <Box className="filter">
              <Text size="sm" weight={800}>
                Select Year:
              </Text>
              <Select
                id="year-select"
                data={Object.keys(applicationsByYear)}
                value={selectedYear}
                onChange={(value) => setSelectedYear(value)}
                radius="md"
                size="sm"
                styles={{
                  dropdown: { padding: "10px" },
                }}
              />
            </Box>

            <Box className="content">
              {/* Chart Section */}
              <Box className="chart-section">
                <svg width="300" height="300" viewBox="0 0 100 100">
                  {
                    applications.reduce(
                      (acc, app, index) => {
                        const { startAngle } = acc;
                        const sweepAngle =
                          (app.count / totalApplications) * 360;
                        const endAngle = startAngle + sweepAngle;

                        const largeArcFlag = sweepAngle > 180 ? 1 : 0;
                        const [startX, startY] = [
                          50 + 40 * Math.cos((Math.PI * startAngle) / 180),
                          50 + 40 * Math.sin((Math.PI * startAngle) / 180),
                        ];
                        const [endX, endY] = [
                          50 + 40 * Math.cos((Math.PI * endAngle) / 180),
                          50 + 40 * Math.sin((Math.PI * endAngle) / 180),
                        ];

                        const midAngle = startAngle + sweepAngle / 2;
                        const [textX, textY] = [
                          50 + 25 * Math.cos((Math.PI * midAngle) / 180),
                          50 + 25 * Math.sin((Math.PI * midAngle) / 180),
                        ];

                        acc.slices.push(
                          <g key={index}>
                            <path
                              d={`M50,50 L${startX},${startY} A40,40 0 ${largeArcFlag} 1 ${endX},${endY} Z`}
                              fill={app.color}
                            />
                            <text
                              x={textX}
                              y={textY}
                              fontSize="4"
                              fill="#fff"
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              {((app.count / totalApplications) * 100).toFixed(
                                1,
                              )}
                              %
                            </text>
                          </g>,
                        );

                        acc.startAngle = endAngle;
                        return acc;
                      },
                      { slices: [], startAngle: 0 },
                    ).slices
                  }
                </svg>

                <Box className="legend">
                  {applications.map((app, index) => (
                    <Box key={index} className="legend-item">
                      <Box
                        className="legend-color"
                        style={{ backgroundColor: app.color }}
                      />
                      <span className="legend-label">{app.label}</span>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Table Section */}
              <Box className="table-section">
                <Title order={3} size="lg" align="center" mb="md">
                  Applications Data
                </Title>
                <Table highlightOnHover>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Count</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, index) => (
                      <tr key={index}>
                        <td>{app.label}</td>
                        <td>{app.count}</td>
                        <td>
                          {((app.count / totalApplications) * 100).toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Box>
            </Box>

            {/* Download Button */}
            <Box className="download-section">
              <Button
                className="download-button"
                radius="md"
                size="md"
                leftIcon={<DownloadSimple size={16} />}
                onClick={handleDownload}
              >
                Download CSV
              </Button>
            </Box>
        </Paper>

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
          {/* Notifications */}
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Box className="dashboard-cards">
            <Text className="dashboard-card-title">
              <Bell size={20} className="icon" /> Notifications
            </Text>
            <Divider className="card-divider" />
            <Text size="sm" mt="sm">
              Stay updated with the latest notifications regarding your patent applications.
            </Text>
            <Button
              variant="outline"
              fullWidth
              mt="md"
              size="sm"
              onClick={() => setActiveTab(TabKeys.NEW_APPLICATIONS)}
              className="markReadButton"
            >
              View Notifications
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
