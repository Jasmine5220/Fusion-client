/* eslint-disable react/prop-types */
// ReviewedApplications.jsx
import React from "react";
import { Card, Text, Button, Box, Grid } from "@mantine/core";
import { Eye, Info } from "phosphor-react";
import PropTypes from "prop-types";
import "../../style/Director/ReviewedApplications.css";

// Updated dummy data with three cards
const ReviewedApplicationsData = [
  {
    title: "Prototype for Visually Impaired",
    applicant: "Ashish Kumar Bhoi",
    applicationNumber: "234567",
    attorney: "Lisa Monroe",
    borderColor: "mediumseagreen",
  },
  {
    title: "AI-Driven Medical Diagnostic Tool",
    applicant: "Shreyas Katkar",
    applicationNumber: "345678",
    attorney: "David Johnson",
    borderColor: "tomato",
  },
  {
    title: "Blockchain-Based Voting System",
    applicant: "Aman Kheria",
    applicationNumber: "456789",
    attorney: "Emily Brown",
    borderColor: "steelblue",
  },
];

// Component for individual application card
function ApplicationCard({
  title,
  applicant,
  applicationNumber,
  attorney,
  borderColor,
  onViewDetails,
}) {
  return (
    <Card
      className="application-card"
      style={{ borderLeft: `6px solid ${borderColor}` }}
    >
      <Text className="card-header">{title}</Text>
      <Text className="card-details">Applicant: {applicant}</Text>
      <Text className="card-details">Application No.: {applicationNumber}</Text>
      <Text className="card-details">Assigned Attorney: {attorney}</Text>
      <Box className="button-container">
        <Button
          variant="outline"
          leftIcon={<Eye size={16} />}
          className="button"
        >
          View Submitted Form
        </Button>
        <Button
          variant="outline"
          leftIcon={<Info size={16} />}
          className="button"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
}

// PropTypes validation for ApplicationCard
ApplicationCard.propTypes = {
  title: PropTypes.string.isRequired,
  applicant: PropTypes.string.isRequired,
  applicationNumber: PropTypes.string.isRequired,
  attorney: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

// Main component
function ReviewedApplications({ setActiveTab }) {
  // Function to handle "View Details" click
  const handleViewDetails = () => {
    setActiveTab("1.1");
  };

  return (
    <Box style={{ padding: "24px" }}>
      <Text className="page-title">Reviewed Applications</Text>
      <Grid>
        {ReviewedApplicationsData.map((application, index) => (
          <Grid.Col span={6} key={index}>
            <ApplicationCard
              title={application.title}
              applicant={application.applicant}
              applicationNumber={application.applicationNumber}
              attorney={application.attorney}
              borderColor={application.borderColor}
              onViewDetails={() => handleViewDetails()}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}

export default ReviewedApplications;
