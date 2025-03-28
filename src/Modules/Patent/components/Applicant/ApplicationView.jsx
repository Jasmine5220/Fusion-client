/* eslint-disable react/prop-types */
import React from "react";
import { Button, Card, Text, Box, Grid } from "@mantine/core";
import "../../style/Applicant/ApplicationView.css";

// Component for individual application card
function ApplicationCard({
  title,
  date,
  tokenNumber,
  applicationNumber,
  attorney,
  onViewApplication,
}) {
  return (
    <Box className="main-box">
      <Card
        className="application-card"
        style={{ borderLeft: "6px solid #4caf50" }}
      >
        <Text className="app-card-header">{title}</Text>
        <Text className="app-card-details">{`Date: ${date}`}</Text>
        <Text className="app-card-details">Token No.: {tokenNumber}</Text>
        <Text className="app-card-details">
          Application No.: {applicationNumber}
        </Text>
        <Text className="app-card-details">Assigned Attorney: {attorney}</Text>
        <Box className="button-container">
          <Button
            variant="outline"
            className="viewApplicationButton"
            onClick={onViewApplication}
          >
            View Application
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

// Main ApplicationView component
function ApplicationView({ setActiveTab }) {
  // AI-based Disease Detection in Crops data
  const applicationData = {
    title: "AI-Based Disease Detection in Crops",
    date: "15/11/2024",
    tokenNumber: "TKN123456",
    applicationNumber: "APP987654",
    attorney: "EFG987654",
  };

  // Handle View Application click
  const handleViewApplication = () => {
    setActiveTab("2.1"); // Set active tab to View Applications
  };

  return (
    <Box style={{ width: "95%" }}>
      <Text className="app-header-texts">View Application</Text>
      <Grid className="view-application-app-container">
        <Grid.Col span={12}>
          <ApplicationCard
            title={applicationData.title}
            date={applicationData.date}
            tokenNumber={applicationData.tokenNumber}
            applicationNumber={applicationData.applicationNumber}
            attorney={applicationData.attorney}
            onViewApplication={handleViewApplication}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default ApplicationView;
