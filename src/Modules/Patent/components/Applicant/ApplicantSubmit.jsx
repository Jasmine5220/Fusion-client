import React from "react";
import { Button, Card, Text, Box, Divider } from "@mantine/core";
import { ArrowRight } from "phosphor-react";
import "../../style/Applicant/ApplicantSubmit.css";

function SubmitNewApplication({ setActiveTab }) {
  const handleSubmit = () => {
    setActiveTab("1.1");
  };
  
  return (
    <Box className="submit-app-container">
      <Text className="submit-header-text">New Patent Application</Text>
      
      <Box className="submit-card-container">
        <Card className="submit-application-card">
          <Text className="card-title" weight={600} size="lg">
            Intellectual Property Filing Form
          </Text>
          <Text className="card-details" size="sm" color="dimmed">
          Please use this form for all types of IP, including Patents, Copyright, Designs etc.
          </Text>
          <Divider my="sm" />
          <Text className="card-description" size="sm">
            Complete this form to initiate a new patent filing. Please ensure all
            necessary details are accurate before submission. This form will help
            streamline your application process and ensure compliance with
            institutional guidelines.
          </Text>
          <Button
            variant="light"
            leftIcon={<ArrowRight size={16} />}
            className="start-application-button"
            onClick={handleSubmit}
            fullWidth
            mt="sm"
          >
            Start Application
          </Button>
        </Card>
      </Box>
    </Box>
  );
}

export default SubmitNewApplication;