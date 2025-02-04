import React, { useState, useEffect } from "react";
import {
  Container,
  Text,
  Card,
  Stepper,
  Textarea,
  Button,
} from "@mantine/core";
import PropTypes from "prop-types";
import "../../style/Pcc_Admin/PCCAStatus.css";

// Simulate fetching status from the backend
const fetchApplicationStatus = async () => {
  return "Attorney Assignment"; // Simulated current status
};

// Patent Progress Bar Component
function PatentProgressBar({ currentStatus }) {
  const progressMapping = {
    "Patent Application Submission": 1,
    "PCC Admin Review": 2,
    "Director Initial Review": 3,
    "Attorney Assignment": 4,
    "Patentability Check": 5,
    "Final Approval by Director": 6,
    "Final Contract Completion": 7,
  };

  const currentStep = progressMapping[currentStatus] || 1;

  return (
    <Stepper
      active={currentStep - 1}
      size="md"
      className="progress-bar-container"
    >
      {Object.keys(progressMapping).map((label, index) => (
        <Stepper.Step key={index} label={label} />
      ))}
    </Stepper>
  );
}

// Add PropTypes validation for PatentProgressBar
PatentProgressBar.propTypes = {
  currentStatus: PropTypes.string.isRequired,
};

// Main Patent Application Component
function PatentApplication({
  title,
  date,
  applicationNumber,
  tokenNumber,
  attorneyName,
  phoneNumber,
  email,
  inventors,
}) {
  const [currentStatus, setCurrentStatus] = useState(
    "Patent Application Submission",
  );
  const [comments, setComments] = useState("");

  useEffect(() => {
    const getStatus = async () => {
      const status = await fetchApplicationStatus();
      setCurrentStatus(status);
    };
    getStatus();
  }, []);

  const handleForwardToDirector = () => {
    if (!comments.trim()) {
      alert("Please provide comments before forwarding.");
      return;
    }
    // Simulate forward action
    alert("Application forwarded to Director with comments!");
  };

  return (
    <Container className="form-container" size="lg">
      <Text className="form-title">Patent Application: {title}</Text>

      {/* Application Details */}
      <Card className="form-section">
        <Text className="section-title">Application Details</Text>
        <div className="form-field">
          <Text className="field-heading">Date:</Text>
          <Text className="field-value">{date}</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Application Number:</Text>
          <Text className="field-value">{applicationNumber}</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Token Number:</Text>
          <Text className="field-value">{tokenNumber}</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Attorney Name:</Text>
          <Text className="field-value">{attorneyName || "N/A"}</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Phone Number:</Text>
          <Text className="field-value">{phoneNumber || "N/A"}</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Email:</Text>
          <Text className="field-value">{email || "N/A"}</Text>
        </div>
      </Card>
      <Card className="form-section">
        <Text className="section-title">
          Section I: Administrative and Technical Details
        </Text>

        <div className="form-field">
          <Text className="field-heading">Title of Application:</Text>
          <Text className="field-value">
            AI-Based Disease Detection in Crops
          </Text>
        </div>

        <Text className="field-group-title">
          1. Please list inventor(s) who have contributed:
        </Text>
        {inventors.map((inventor, index) => (
          <div key={index} className="inventor-container">
            <Text className="inventor-title">Inventor {index + 1}</Text>
            <div className="form-field">
              <Text className="field-heading">Name:</Text>
              <Text className="field-value">{inventor.name}</Text>
            </div>
            <div className="form-field">
              <Text className="field-heading">Email:</Text>
              <Text className="field-value">{inventor.email}</Text>
            </div>
            <div className="form-field">
              <Text className="field-heading">Contact Address:</Text>
              <Text className="field-value">{inventor.address}</Text>
            </div>
            <div className="form-field">
              <Text className="field-heading">Mobile:</Text>
              <Text className="field-value">{inventor.mobile}</Text>
            </div>
          </div>
        ))}

        <div className="form-field">
          <Text className="field-heading">Area of the invention:</Text>
          <Text className="field-value">Agricultural Technology and AI</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Problem in the area:</Text>
          <Text className="field-value">
            Lack of efficient and affordable disease detection tools for
            farmers.
          </Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Objective of your invention:</Text>
          <Text className="field-value">
            To develop an affordable and accurate AI-driven tool for disease
            diagnosis in crops.
          </Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Novelty:</Text>
          <Text className="field-value">
            The first AI model optimized for real-time, edge-device use in the
            field.
          </Text>
        </div>
      </Card>

      {/* IPR Form Section */}
      <Card className="form-section">
        <Text className="section-title">
          Section I: Administrative and Technical Details
        </Text>
        <div className="form-field">
          <Text className="field-heading">Title of Application:</Text>
          <Text className="field-value">
            AI-Based Disease Detection in Crops
          </Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Area of the invention:</Text>
          <Text className="field-value">Agricultural Technology and AI</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Problem in the area:</Text>
          <Text className="field-value">
            Lack of efficient and affordable disease detection tools for
            farmers.
          </Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Objective of your invention:</Text>
          <Text className="field-value">
            To develop an affordable and accurate AI-driven tool for disease
            diagnosis in crops.
          </Text>
        </div>
      </Card>
      <Card className="form-section">
        <Text className="section-title">Section II: IPR Ownership</Text>
        <div className="form-field">
          <Text className="field-heading">
            Significant use of funds/facilities:
          </Text>
          <Text className="field-value">
            Yes, using IIITDM Jabalpur's research facilities.
          </Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Source of funding:</Text>
          <Text className="field-value">Institute's research grant</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">
            Journal/Conference Presentation:
          </Text>
          <Text className="field-value">
            Presented at AI & Agriculture 2024 Conference.
          </Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">MOU or Agreement Details:</Text>
          <Text className="field-value">
            Sponsored under IIITDM Research Fund (MOU #12345).
          </Text>
        </div>
      </Card>

      {/* Commercialization Section */}
      <Card className="form-section">
        <Text className="section-title">Section III: Commercialization</Text>
        <div className="form-field">
          <Text className="field-heading">Target Companies:</Text>
          <Text className="field-value">
            Monsanto India, Agrotech Pvt Ltd, and Agribots Inc.
          </Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Development Stage:</Text>
          <Text className="field-value">Partially developed</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">
            Uploaded duly filled and signed Form-III:
          </Text>
          <div className="field-value">
            <Button
              component="a"
              href="https://example.com/sample.pdf"
              target="_blank"
              download="Form-III.pdf"
              color="blue"
              className="down-button"
            >
              View Form-III
            </Button>
          </div>
        </div>
      </Card>

      {/* Dates */}
      <Card className="form-section">
        <Text className="section-title">Dates and Status</Text>

        <div className="form-field">
          <Text className="field-heading">Submission Date:</Text>
          <Text className="field-value">15 November 2024</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Forwarded to Director:</Text>
          <Text className="field-value">16 November 2024</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Approved Date:</Text>
          <Text className="field-value">17 November 2024</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Attorney Assigned:</Text>
          <Text className="field-value">18 November 2024</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Report Generated:</Text>
          <Text className="field-value">19 November 2024</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Filed Date:</Text>
          <Text className="field-value">20 November 2024</Text>
        </div>
      </Card>

      {/* Comments Section */}
      <Card className="form-section button-section">
        <Text className="section-title">Approximate Cost</Text>
        <Textarea
          placeholder="Enter Value in ₹(INR)"
          value={comments}
          onChange={(event) => setComments(event.currentTarget.value)}
          className="comments-box"
          autosize
          minRows={3}
        />
        {/* <Button
            onClick={handleForwardToDirector}
            color="blue"
            style={{ marginTop: "10px" }}
          >
            Review
          </Button>
          <Button
            onClick={handleForwardToDirector}
            color="blue"
            style={{ marginTop: "10px" }}
          >
            Download Form
          </Button> */}
        {/* <Button
          onClick={handleForwardToDirector}
          color="blue"
          style={{ marginTop: "10px" }}
        >
          Forward to Director
        </Button> */}
      </Card>

      {/* Application Status */}
      <Card className="form-section">
        <Text className="section-title">Application Progress</Text>
        <PatentProgressBar currentStatus={currentStatus} />
      </Card>

      {/* Form Actions */}
      <div className="form-actions">
        <Button
          component="a"
          href="https://example.com/sample.pdf"
          target="_blank"
          download="Form-III.pdf"
          className="down-button"
        >
          Download Form
        </Button>
        <Button
          onClick={handleForwardToDirector}
          color="blue"
          className="down-button"
        >
          Review Application
        </Button>
        <Button
          onClick={handleForwardToDirector}
          color="blue"
          className="down-button"
        >
          Forward to Director
        </Button>
      </div>
    </Container>
  );
}

// PropTypes and DefaultProps
PatentApplication.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  applicationNumber: PropTypes.string.isRequired,
  tokenNumber: PropTypes.string.isRequired,
  attorneyName: PropTypes.string,
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  inventors: PropTypes.arrayOf(
    PropTypes.shape({
      names: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

PatentApplication.defaultProps = {
  attorneyName: "N/A",
  phoneNumber: "N/A",
  email: "N/A",
};

// Sample Application Component
function SampleAppDetails() {
  const inventors = [
    {
      name: "Dr. Rajesh Sharma",
      email: "rajesh.sharma@iiitdmj.ac.in",
      address: "IIITDM Jabalpur, Dumna Airport Road, Jabalpur, MP - 482005",
      mobile: "+91-9876543210",
      share: 40,
    },
    {
      name: "Amit Kumar",
      email: "amit.kumar@student.iiitdmj.ac.in",
      address: "IIITDM Hostel Block B, Jabalpur, MP - 482005",
      mobile: "+91-9123456780",
      share: 30,
    },
  ];

  return (
    <PatentApplication
      title="Wireless Communication System for IoT Devices"
      date="12/09/2024"
      applicationNumber="APP001234"
      tokenNumber="TKN001234"
      attorneyName="Janmesh Dwivedi"
      phoneNumber="555-987-6543"
      email="attorney@example.com"
      inventors={inventors}
    />
  );
}

export default SampleAppDetails;
