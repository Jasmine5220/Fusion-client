import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Text, Box, Grid } from "@mantine/core";
import { CheckCircle, Info } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import "../../style/Director/ActiveApplications.css";

// Dummy data for active applications
const activeApplicationsData = [
  {
    title: "Cloud-Based Data Storage Solution",
    date: "25/11/2024",
    time: "10:00:00",
    tokenNumber: "TKN004567",
    applicationNumber: "APP004567",
    attorney: "XYZ123456",
    borderColor: "mediumblue",
  },
  {
    title: "Virtual Reality Gaming Platform",
    date: "22/11/2024",
    time: "12:30:00",
    tokenNumber: "TKN004568",
    applicationNumber: "APP004568",
    attorney: "ABC987654",
    borderColor: "darkorange",
  },
  {
    title: "AI-Based Customer Support Chatbot",
    date: "20/11/2024",
    time: "14:15:00",
    tokenNumber: "TKN004569",
    applicationNumber: "APP004569",
    attorney: "DEF123456",
    borderColor: "seagreen",
  },
  {
    title: "Smart Agriculture Monitoring System",
    date: "18/11/2024",
    time: "16:45:00",
    tokenNumber: "TKN004570",
    applicationNumber: "APP004570",
    attorney: "GHI654321",
    borderColor: "crimson",
  },
];

// Component for individual active application card
function ActiveApplicationCard({
  title,
  date,
  time,
  tokenNumber,
  applicationNumber,
  attorney,
  borderColor,
  onReview,
  onViewDetails,
}) {
  return (
    <Card
      className="active-application-card"
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
          leftIcon={<CheckCircle size={16} />}
          className="button"
          onClick={onReview}
        >
          Review
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

// PropTypes validation for ActiveApplicationCard
ActiveApplicationCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  tokenNumber: PropTypes.string.isRequired,
  applicationNumber: PropTypes.string.isRequired,
  attorney: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  onReview: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

// Main ActiveApplications component
function ActiveApplications() {
  const navigate = useNavigate();

  // Function to handle the review click
  const handleReview = (application) => {
    navigate(`/patent/review/active/${application.applicationNumber}`, {
      state: { application },
    });
  };
  // Function to handle "View Details" click
  const handleViewDetails = (application) => {
    navigate(`/patent/director/final-review/details`, {
      state: { application },
    });
  };

  return (
    <Box>
      <Text className="header-text">Active Applications</Text>
      <Grid className="app-container">
        {activeApplicationsData.map((application, index) => (
          <Grid.Col span={6} key={index}>
            <ActiveApplicationCard
              title={application.title}
              date={application.date}
              time={application.time}
              tokenNumber={application.tokenNumber}
              applicationNumber={application.applicationNumber}
              attorney={application.attorney}
              borderColor={application.borderColor}
              onReview={() => handleReview(application)} // Pass application data to handler
              onViewDetails={() => handleViewDetails(application)}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}

export default ActiveApplications;
