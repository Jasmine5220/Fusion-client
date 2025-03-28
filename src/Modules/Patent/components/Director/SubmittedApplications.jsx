/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button, Card, Text, Box, Grid } from "@mantine/core";
import { Info } from "phosphor-react";
import submittedApplicationsData from "../../data/director/submittedApplicationsData";
import "../../style/Director/SubmittedApplications.css";

// Component for individual application card
function SubmittedApplicationCard({
  tokenNumber,
  title,
  date,
  applicationNumber,
  attorney,
  onViewDetails,
}) {
  return (
    <Card className="submitted-application-card">
      <Text className="card-token-number">Token No.: {tokenNumber}</Text>
      <Text className="card-title">{title}</Text>
      <Box className="card-details-box">
        <Text className="card-details">Date: {date}</Text>
        <Text className="card-details">
          Application No.: {applicationNumber}
        </Text>
        <Text className="card-details">Assigned Attorney: {attorney}</Text>
      </Box>
      <Button
        variant="outline"
        leftIcon={<Info size={16} />}
        mt="md"
        className="view-details-button"
        onClick={onViewDetails}
        fullWidth
      >
        View Details
      </Button>
    </Card>
  );
}

// Main component
function SubmittedApplications({ setActiveTab }) {
  const [applications, setApplications] = useState([]);
  const [isMobile, setIsMobile] = useState(false); // State for mobile detection

  // Simulating data fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate an async fetch operation
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(submittedApplicationsData);
          }, 1000);
        });
        setApplications(response);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };

    fetchData();

    // Check if the screen size is mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set mobile screen size threshold
    };

    handleResize(); // Initialize on first render
    window.addEventListener("resize", handleResize); // Listen to resize events

    return () => window.removeEventListener("resize", handleResize); // Clean up on unmount
  }, []);

  const handleViewDetails = (applicationId) => {
    console.log(`Viewing details for application ID: ${applicationId}`);
    setActiveTab("1.1");
  };

  return (
    <Box className="submitted-applications-container">
      <Text className="submitted-header-text">
        Applications Forwarded by PCC Admin
      </Text>
      <Grid
        gutter="lg"
        className="submitted-applications-grid"
        align="stretch"
        // Set responsive layout: 6 span for large screens, full width for mobile
        sx={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column", // Display cards horizontally on mobile
          gap: "20px",
        }}
      >
        {applications.map((application) => (
          <Grid.Col
            span={isMobile ? 12 : 6} // Use 12 for full-width on mobile, 6 for desktop
            key={application.id}
          >
            <SubmittedApplicationCard
              tokenNumber={application.tokenNumber}
              title={application.title}
              date={application.date}
              applicationNumber={application.applicationNumber}
              attorney={application.attorney}
              onViewDetails={() => handleViewDetails(application.id)}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}

export default SubmittedApplications;
