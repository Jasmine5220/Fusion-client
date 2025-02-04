import React from "react";
import { Button, Card, Text, Box, Divider } from "@mantine/core";
import "../../style/Applicant/ApplicantSubmit.css";

// eslint-disable-next-line react/prop-types
function SubmitNewApplication({ setActiveTab }) {
  const handleSubmit = () => {
    setActiveTab("1.1");
  };
  return (
    <Box style={{ width: "50%" }}>
      <Text className="header-texts">New Patent Application</Text>
      <Card className="card">
        <Text className="new-card-title">
          Intellectual Property Filing Form
        </Text>
        <Text className="card-details">
          Complete this form to initiate a new patent filing. Please ensure all
          necessary details are accurate before submission. This form will help
          streamline your application process and ensure compliance with
          institutional guidelines.
        </Text>
        <Divider className="card-line" />
        <Button
          variant="outline"
          className="submit-button"
          onClick={handleSubmit}
        >
          Submit New Patent Application
        </Button>
      </Card>
    </Box>
  );
}
export default SubmitNewApplication;
