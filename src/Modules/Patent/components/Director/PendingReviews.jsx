import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Text, Box, Grid } from "@mantine/core";
import { Hourglass, Info } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import "../../style/Director/PendingReviews.css";

// Dummy data for pending reviews
const pendingReviewsData = [
  {
    title: "Mobile Payment Security Protocol",
    date: "20/10/2024",
    time: "09:30:00",
    tokenNumber: "TKN003456",
    applicationNumber: "APP003456",
    attorney: "JKL123456",
    borderColor: "orange",
  },
  {
    title: "Smart Waste Management System",
    date: "12/10/2024",
    time: "16:30:00",
    tokenNumber: "TKN003459",
    applicationNumber: "APP003459",
    attorney: "STU654321",
    borderColor: "steelblue",
  },
  {
    title: "AI-Driven Personalized Learning System",
    date: "15/10/2024",
    time: "14:00:00",
    tokenNumber: "TKN003458",
    applicationNumber: "APP003458",
    attorney: "PQR123456",
    borderColor: "mediumseagreen",
  },
  {
    title: "Telemedicine Platform for Remote Consultations",
    date: "18/10/2024",
    time: "11:15:00",
    tokenNumber: "TKN003457",
    applicationNumber: "APP003457",
    attorney: "MNO987654",
    borderColor: "lightcoral",
  },
];

// Component for individual pending review card
function PendingReviewCard({
  title,
  date,
  time,
  tokenNumber,
  applicationNumber,
  attorney,
  onReview,
  onViewDetails,
}) {
  return (
    <Card className="pending-review-card">
      <Text className="card-header">{title}</Text>
      <Text className="card-details">{`${date} | ${time}`}</Text>
      <Text className="card-details">Token No.: {tokenNumber}</Text>
      <Text className="card-details">Application No.: {applicationNumber}</Text>
      <Text className="card-details">Assigned Attorney: {attorney}</Text>
      <Box className="button-container">
        <Button
          variant="outline"
          leftIcon={<Hourglass size={16} />}
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

// PropTypes validation for PendingReviewCard
PendingReviewCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  tokenNumber: PropTypes.string.isRequired,
  applicationNumber: PropTypes.string.isRequired,
  attorney: PropTypes.string.isRequired,
  onReview: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

// Main PendingReviewsView component
function PendingReviewsView() {
  const navigate = useNavigate();

  // Function to handle the review click
  const handleReview = (application) => {
    navigate(`/patent/review/pending/${application.applicationNumber}`, {
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
      <Text className="header-text">Pending Reviews</Text>
      <Grid className="app-container">
        {pendingReviewsData.map((application, index) => (
          <Grid.Col span={6} key={index}>
            <PendingReviewCard
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

export default PendingReviewsView;
