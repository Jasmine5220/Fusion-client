import React from "react";
import { Button, Card, Text, Box, Divider, useMantineTheme } from "@mantine/core";
import "../../style/Applicant/ApplicantSubmit.css";

function SubmitNewApplication({ setActiveTab }) {
  const theme = useMantineTheme();
  const handleSubmit = () => {
    setActiveTab("1.1");
  };
  
  return (
    <Box style={{ 
      width: "100%",
      maxWidth: "600px",
      margin: "0 auto",
      marginLeft: "30px"  // Shift everything to the left
    }}>
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
          fullWidth
        >
          Start Application
        </Button>
      </Card>
    </Box>
  );
}
export default SubmitNewApplication;