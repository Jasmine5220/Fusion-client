import React from "react";
import { Button, Card, Text, Box, Divider } from "@mantine/core";

function SubmitNewApplication({ setActiveTab }) {
  const handleSubmit = () => {
    setActiveTab("1.1");
  };
  
  return (
    <Box className="submit-app-container">
      <Text className="submit-app-header">New Patent Application</Text>
      <Box className="submit-app-content">
        <Card className="submit-app-card">
          <Text className="app-card-title">
            Intellectual Property Filing Form
          </Text>
          <Text className="app-card-details">
            Complete this form to initiate a new patent filing. Please ensure all
            necessary details are accurate before submission. This form will help
            streamline your application process and ensure compliance with
            institutional guidelines.
          </Text>
          <Divider className="app-card-divider" my="sm" />
          <Button
            variant="outline"
            className="submit-app-button"
            onClick={handleSubmit}
            fullWidth
          >
            Start Application
          </Button>
        </Card>
      </Box>
    </Box>
  );
}

export default SubmitNewApplication;