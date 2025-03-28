import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  TextInput,
  Textarea,
  Grid,
  Divider,
} from "@mantine/core";
import "../../style/Pcc_Admin/ReviewComponent.css"; // Import your CSS file

// Mock function to fetch filled application data
const fetchFilledData = () => {
  return {
    title: "Innovative Water Purification System",
    inventorName: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    contactAddress: "123, Green Street, New Delhi, India",
    mobileNumber: "+91 98765 43210",
    areaOfInvention: "Water Purification Technology",
    problemInArea: "Lack of access to clean drinking water in rural areas.",
    objectiveOfInvention:
      "To provide affordable and effective water purification solutions.",
    novelty: "Utilizes solar energy for purification.",
    utility:
      "More cost-effective and environmentally friendly compared to existing solutions.",
    experimentalTesting:
      "Prototype tested with positive results in local communities.",
    applications:
      "- Rural water supply\n- Emergency relief efforts\n- Household use",
    significantUse: "Providing safe drinking water to underserved populations.",
    fundingSource: "Government grants and NGO support.",
    targetCompanies: `Company Name: AquaTech\nConcerned Person: Mr. Verma\nContact Number: +91 12345 67890`,
  };
};

function ReviewAppComponent() {
  const [data, setData] = useState({});

  // Fetch filled data when the component mounts
  useEffect(() => {
    const filledData = fetchFilledData();
    setData(filledData);
  }, []);

  return (
    <Box padding="xl" className="form-container">
      <Text className="header">Intellectual Property Filing Form</Text>
      <Text className="sub-header">
        (Please use this form for all types of IP, including Patents, Copyright,
        Designs, Marks, and even Know-how)
      </Text>

      <Divider my="md" />

      {/* Section I: Administrative and Technical Details */}
      <Text className="section-title">
        Section - I: Administrative and Technical Details
      </Text>

      <Grid gutter="md">
        <Grid.Col span={12}>
          <TextInput
            label="Title of Application *"
            placeholder="Enter title of the application"
            defaultValue={data.title}
            required
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Inventor-1 Name *"
            placeholder="Name of Inventor"
            defaultValue={data.inventorName}
            required
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Email *"
            placeholder="Email of Inventor"
            defaultValue={data.email}
            required
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Contact Address *"
            placeholder="Contact Address of Inventor"
            defaultValue={data.contactAddress}
            required
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Mobile Number *"
            placeholder="Mobile Number of Inventor"
            defaultValue={data.mobileNumber}
            required
          />
        </Grid.Col>
      </Grid>

      {/* General Questions */}
      <Text className="question-title">General Questions</Text>
      <Textarea
        label="2. What is the area of the invention? *"
        placeholder="Enter the area of the invention"
        defaultValue={data.areaOfInvention}
        required
      />
      <Textarea
        label="3. What is the problem in the area? *"
        placeholder="Enter the problem in the area"
        defaultValue={data.problemInArea}
        required
      />
      <Textarea
        label="4. What is the objective of your invention? *"
        placeholder="Enter the objective of the invention"
        defaultValue={data.objectiveOfInvention}
        required
      />
      <Textarea
        label="5. What is the novelty? *"
        placeholder="Enter the novelty of the invention"
        defaultValue={data.novelty}
        required
      />
      <Textarea
        label="6. What is the utility (advantages) of the present invention over comparable inventors? *"
        placeholder="Describe advantages over comparable inventors"
        defaultValue={data.utility}
        required
      />

      {/* Additional Questions */}
      <Textarea
        label="7. Has the invention been tested experimentally? *"
        placeholder="Proof-of-concept/Prototype details"
        defaultValue={data.experimentalTesting}
        required
      />
      <Textarea
        label="8. Can you think of applications of your invention? *"
        placeholder="List down applications of your invention"
        defaultValue={data.applications}
        required
      />

      {/* IPR Ownership Questions */}
      <Text className="section-title">IPR Ownership Questions</Text>
      <Textarea
        label="9. What is the significant use of your invention? *"
        placeholder="Describe significant use of your invention"
        defaultValue={data.significantUse}
        required
      />
      <Textarea
        label="10. What is the source of funding? *"
        placeholder="Enter funding source"
        defaultValue={data.fundingSource}
        required
      />

      {/* Commercialization Section */}
      <Text className="section-title">Commercialization</Text>
      <Textarea
        label="1. Who are the Target companies?"
        placeholder="Please give specific list of companies and contact details"
        defaultValue={data.targetCompanies}
        required
      />

      {/* Buttons for actions */}
      <Box mt={30} className="button-container">
        <Button variant="outline" color="blue" className="action-button">
          Review
        </Button>
        <Button variant="outline" color="orange" className="action-button">
          Download Form
        </Button>
        <Button variant="outline" color="red" className="action-button">
          Forward To Director
        </Button>
      </Box>
    </Box>
  );
}

export default ReviewAppComponent;
