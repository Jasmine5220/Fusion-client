/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Text, Box, Grid } from "@mantine/core";
import { Info } from "phosphor-react";
// import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import pendingReviewsData from "../../data/director/PendingReviewsData";
import "../../style/Director/RecentsView.css";

// Component for individual pending review card
function PendingReviewCard({
  tokenNumber,
  title,
  date,
  time,
  applicationNumber,
  attorney,
  borderColor,
  onViewDetails,
}) {
  return (
    <Card
      className="pending-review-card"
      style={{ borderLeft: `6px solid ${borderColor}` }}
    >
      <Text className="card-header">{tokenNumber}</Text>
      <Text className="card-title">{title}</Text>
      <Text className="card-details">Next Date: {date}</Text>
      <Text className="card-details">Time: {time}</Text>
      <Text className="card-details">Application No.: {applicationNumber}</Text>
      <Text className="card-details">Assigned Attorney: {attorney}</Text>
      <Box className="button-container">
        <Button
          variant="outline"
          leftIcon={<Info size={16} />}
          fontSize="16px"
          className="buttonone"
          onClick={() =>
            onViewDetails({
              tokenNumber,
              title,
              date,
              time,
              applicationNumber,
              attorney,
            })
          }
          fullWidth
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
}

// PropTypes validation for PendingReviewCard
PendingReviewCard.propTypes = {
  tokenNumber: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  applicationNumber: PropTypes.string.isRequired,
  attorney: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

// Main RecentsView component
function RecentsView({ setActiveTab }) {
  // const navigate = useNavigate();

  // Handle "View Details" click
  const handleViewDetails = (application) => {
    console.log("Viewing details for:", application);
    setActiveTab("1.1");
  };

  // Determine grid layout based on screen size using useMediaQuery hook
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box>
      <Text className="header-text">Recently Reviewed</Text>
      <Grid
        className={`app-container ${isMobile ? "mobile-layout" : "desktop-layout"}`}
      >
        {pendingReviewsData.map((application, index) => (
          <Grid.Col span={isMobile ? 12 : 6} key={index}>
            <PendingReviewCard
              tokenNumber={application.tokenNumber}
              title={application.title}
              date={application.date}
              time={application.time}
              applicationNumber={application.applicationNumber}
              attorney={application.attorney}
              borderColor={application.borderColor}
              onViewDetails={handleViewDetails}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}

export default RecentsView;
