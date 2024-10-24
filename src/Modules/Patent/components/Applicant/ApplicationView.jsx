import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Text, Box, Grid, Anchor } from "@mantine/core";
import { Eye, Info } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import CustomBreadcrumbs from "../../../../components/Breadcrumbs"; // Updated import
import "./ApplicationView.css"; // Import the CSS file

// Dummy data for applications
const applicationsData = [
  {
    title: "Title of Patent Application",
    date: "DD/MM/YYYY",
    time: "HH:MM:SS",
    tokenNumber: "Token number",
    applicationNumber: "Application Number",
    attorney: "Name of Attorney",
    borderColor: "orange",
  },
  {
    title: "Title of Patent Application",
    date: "DD/MM/YYYY",
    time: "HH:MM:SS",
    tokenNumber: "Token number",
    applicationNumber: "Application Number",
    attorney: "Name of Attorney",
    borderColor: "lightblue",
  },
  {
    title: "Title of Patent Application",
    date: "DD/MM/YYYY",
    time: "HH:MM:SS",
    tokenNumber: "Token number",
    applicationNumber: "Application Number",
    attorney: "Name of Attorney",
    borderColor: "lightgreen",
  },
  {
    title: "Title of Patent Application",
    date: "DD/MM/YYYY",
    time: "HH:MM:SS",
    tokenNumber: "Token number",
    applicationNumber: "Application Number",
    attorney: "Name of Attorney",
    borderColor: "lightgreen",
  },
];

// Component for individual application card
function ApplicationCard({
  title,
  date,
  time,
  tokenNumber,
  applicationNumber,
  attorney,
  borderColor,
}) {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle the click and navigate to /applicant/applications/status-view
  const handleViewDetails = () => {
    navigate("/patent/applicant/applications/status-view"); // Updated route
  };
  return (
    <Card
      className="application-card"
      style={{ borderLeft: `6px solid ${borderColor}` }}
    >
      <Text className="card-header">{title}</Text>
      <Text className="card-details">{`${date} | ${time}`}</Text>
      <Text className="card-details">Token No.: {tokenNumber}</Text>
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
          onClick={handleViewDetails}
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
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  tokenNumber: PropTypes.string.isRequired,
  applicationNumber: PropTypes.string.isRequired,
  attorney: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
};

// Main ViewApplicationsPage component
function ViewApplicationsPage() {
  return (
    <Box style={{ padding: "24px" }}>
      {/* Breadcrumb navigation */}
      <CustomBreadcrumbs />

      {/* Header */}
      <Text className="header">View Applications</Text>

      {/* Tab options */}
      <Box className="tab-container">
        <Anchor
          component={Link}
          to="/patent/applicant/applications/submit"
          underline={false}
        >
          Submit New Application
        </Anchor>
        <Text size="sm" className="active">
          View Applications
        </Text>
        <Anchor
          component={Link}
          to="/patent/applicant/drafts"
          underline={false}
        >
          Saved Drafts
        </Anchor>
        <Anchor
          component={Link}
          to="/patent/applicant/notifications"
          underline={false}
        >
          Notifications
        </Anchor>
      </Box>

      {/* Application cards */}
      <Grid className="application-container">
        {applicationsData.map((application, index) => (
          <Grid.Col span={6} key={index}>
            <ApplicationCard
              title={application.title}
              date={application.date}
              time={application.time}
              tokenNumber={application.tokenNumber}
              applicationNumber={application.applicationNumber}
              attorney={application.attorney}
              borderColor={application.borderColor}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}

export default ViewApplicationsPage;
