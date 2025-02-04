import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Box,
  Text,
  Divider,
  Button,
  Select,
  Table,
  Paper,
  Container,
  Title,
} from "@mantine/core";
import {
  Eye,
  List,
  Briefcase,
  ArrowCircleDown,
  Buildings,
  DownloadSimple,
} from "@phosphor-icons/react";

import "../../style/Pcc_Admin/PCCAdminDashboard.css";

function PCCAdminDashboard({ setActiveTab }) {
  // Insights
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

  // Function to Render Dashboard Cards
  const renderDashboardCard = (icon, title, description, tabId) => (
    <Box className="dashboard-card">
      <Text className="dashboard-card-title">
        {icon} {title}
      </Text>
      <Divider className="card-divider" />
      <Text size="sm" mt="sm">
        {description}
      </Text>
      <Button
        variant="outline"
        className="dashboard-button add"
        onClick={() => setActiveTab(tabId)}
      >
        {title}
      </Button>
    </Box>
  );

  return (
    <Box>
      {/* Page Title */}
      <Text className="dashboard-title">Patent & Copyright Cell Dashboard</Text>

      {/* Overview Section */}
      <Box className="overview-section">
        <Text className="overview-title">
          IIITDM Jabalpur's Patent Management System (PMS)
          <Buildings size={24} className="overview-icon" />
        </Text>
        <Text className="overview-text">
          The Patent Management System at IIITDM Jabalpur focuses on fostering
          research and development activities, particularly in IT-enabled design
          and manufacturing, as well as the design of IT systems.
        </Text>
      </Box>

      {/* Insights Section */}
      <Container style={{ margin: "0", marginLeft: "7%" }}>
        <Paper shadow="md" radius="lg" padding="xl" className="insights-page">
          <Title order={2} align="center" className="page-title">
            Applications Overview - {selectedYear}
          </Title>
          <Text align="center" color="dimmed" className="description">
            Select a year from the dropdown below to view the statistics of
            applications for that year. You can also download the data as a CSV
            file for further analysis.
          </Text>

          <div className="filter">
            <Text size="sm" weight={600}>
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
          </div>

          <div className="content">
            <div className="chart-section">
              <svg width="300" height="300" viewBox="0 0 100 100">
                {
                  applications.reduce(
                    (acc, app, index) => {
                      const { startAngle } = acc;
                      const sweepAngle = (app.count / totalApplications) * 360;
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
                            {((app.count / totalApplications) * 100).toFixed(1)}
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

              <div className="legend">
                {applications.map((app, index) => (
                  <div key={index} className="legend-item">
                    <div
                      className="legend-color"
                      style={{ backgroundColor: app.color }}
                    />
                    <span className="legend-label">{app.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="table-section">
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
            </div>
          </div>

          <div className="download">
            <Button
              className="DB"
              radius="md"
              size="md"
              leftIcon={<DownloadSimple size={16} />}
              onClick={handleDownload}
            >
              Download CSV
            </Button>
          </div>
        </Paper>
      </Container>

      {/* Dashboard Sections */}
      <Grid mt="md" className="dashboard-grid">
        {/* Dashboard Cards */}
        <Grid.Col span={6}>
          {renderDashboardCard(
            <Eye size={20} className="icon" />,
            "New Applications",
            "Review and provide feedback on the latest applications.",
            "1",
          )}
        </Grid.Col>

        <Grid.Col span={6}>
          {renderDashboardCard(
            <List size={20} className="icon" />,
            "Status of Applications",
            "Track the current status of all applications.",
            "2",
          )}
        </Grid.Col>

        <Grid.Col span={6}>
          {renderDashboardCard(
            <Briefcase size={20} className="icon" />,
            "Manage Attorney Details",
            "Manage and update attorney information.",
            "3",
          )}
        </Grid.Col>

        <Grid.Col span={6}>
          {renderDashboardCard(
            <ArrowCircleDown size={20} className="icon" />,
            "Downloads",
            "Access and download important documents.",
            "4",
          )}
        </Grid.Col>
      </Grid>
    </Box>
  );
}

PCCAdminDashboard.propTypes = {
  setActiveTab: PropTypes.func.isRequired, // Ensure setActiveTab is a required function
};

export default PCCAdminDashboard;
