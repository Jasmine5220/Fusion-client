import React, { useState } from "react";
import {
  Container,
  Text,
  Card,
  Stepper,
  Select,
  Button,
  Group,
  Paper,
  Badge,
  Textarea,
  Divider,
  Space,
  Anchor,
} from "@mantine/core";
import PropTypes from "prop-types";
import { IconDownload } from "@tabler/icons-react";
import "../../style/Director/StatusView.css";

// Simulate fetching status from the backend
const fetchApplicationStatus = async () => {
  return "Director Initial Review"; // Simulated current status
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

PatentProgressBar.propTypes = {
  currentStatus: PropTypes.string.isRequired,
};

function PatentApplication({
  title,
  date,
  applicationNumber,
  tokenNumber,
  attorneyName,
  phoneNumber,
  email,
  inventors,
  additionalInfo,
}) {
  const [currentStatus, setCurrentStatus] = useState(
    "Patent Application Submission",
  );
  const [selectedAttorney, setSelectedAttorney] = useState("");
  const [comments, setComments] = useState("");
  const [actionTaken, setActionTaken] = useState(null);

  const attorneys = [
    { value: "janmesh_dwivedi", label: "Janmesh Dwivedi" },
    { value: "lisa_monroe", label: "Lisa Monroe" },
    { value: "john_smith", label: "John Smith" },
    { value: "sarah_johnson", label: "Sarah Johnson" },
  ];

  React.useEffect(() => {
    const getStatus = async () => {
      const status = await fetchApplicationStatus();
      setCurrentStatus(status);
    };
    getStatus();
  }, []);

  const handleAssignAttorney = () => {
    if (!selectedAttorney) {
      alert("Please select an attorney before assigning.");
      return;
    }
    alert(`Attorney ${selectedAttorney} assigned successfully!`);
    setCurrentStatus("Attorney Assignment");
  };

  const handleApplicationAction = (action) => {
    setActionTaken(action);
    alert(`Application ${action.toLowerCase()}!`);
    if (action === "Accepted") {
      setCurrentStatus("Final Approval by Director");
    }
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
          <Text className="field-heading">Proposed Attorney:</Text>
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

      {/* Dates and Status */}
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
        {currentStatus === "Attorney Assignment" && (
          <div className="form-field">
            <Text className="field-heading">Attorney Assigned:</Text>
            <Text className="field-value">18 November 2024</Text>
          </div>
        )}
        
        <Divider my="md" />
        
        <Text className="section-title">Note from PCC Admin</Text>
        <Paper p="md" withBorder radius="md" bg="gray.0">
          <Text className="field-value">{additionalInfo}</Text>
        </Paper>
      </Card>

      {/* Assign Attorney Section */}
      <Card className="form-section">
        <Text className="section-title">Assign Attorney</Text>
        <Group align="flex-end">
          <Select
            label="Select Attorney"
            placeholder="Choose an attorney"
            data={attorneys}
            value={selectedAttorney}
            onChange={setSelectedAttorney}
            style={{ flex: 1 }}
          />
          <Button onClick={handleAssignAttorney} color="blue">
            Assign Attorney
          </Button>
        </Group>
      </Card>

      {/* Section I: Administrative and Technical Details */}
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
            Lack of efficient and affordable disease detection tools for farmers.
          </Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Objective of your invention:</Text>
          <Text className="field-value">
            To develop an affordable and accurate AI-driven tool for disease
            diagnosis in crops.
          </Text>
        </div>
        
        <Text className="field-group-title">
          1. List of inventor(s) who have contributed:
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
      </Card>

      {/* Section II: IPR Ownership */}
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

      {/* Section III: Commercialization */}
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
                <Button
        component="a"
        href="https://example.com/form-III.pdf"
        target="_blank"
        download="Form-III.pdf"
        color="blue"
        className="down-button"
      >
                  View Form-III
                </Button>
              </div>
            </Card>

      {/* Download Full Application */}
      <Card className="form-section">
        <Text className="section-title">Complete Application Package</Text>
        <Button
          leftSection={<IconDownload size={18} />}
          component="a"
          href="https://example.com/full-application.zip"
          download="Patent_Application_Package.zip"
          color="blue"
          fullWidth
          size="md"
        >
          Download Full Application (ZIP)
        </Button>
        <Text size="sm" c="dimmed" mt="xs">
          Includes all forms, documents, and supporting materials submitted by the applicant.
        </Text>
      </Card>

      {/* Application Status */}
      <Card className="form-section">
        <Text className="section-title">Application Progress</Text>
        <PatentProgressBar currentStatus={currentStatus} />
      </Card>

      {/* Review Section */}
      <Card className="form-section">
        <Text className="section-title">Review Application</Text>
        <Textarea
          label="Director's Comments"
          placeholder="Enter your review comments..."
          value={comments}
          onChange={(event) => setComments(event.currentTarget.value)}
          autosize
          minRows={3}
        />
        <Group justify="center" mt="md" gap="md">
          <Button
            color="green"
            onClick={() => handleApplicationAction("Accepted")}
          >
            Accept Application
          </Button>
          <Button
            color="red"
            onClick={() => handleApplicationAction("Rejected")}
          >
            Reject Application
          </Button>
          <Button
            color="yellow"
            onClick={() => handleApplicationAction("Marked for Review")}
          >
            Mark for Review
          </Button>
        </Group>
      </Card>
    </Container>
  );
}

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
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      mobile: PropTypes.string.isRequired,
    }),
  ).isRequired,
  additionalInfo: PropTypes.string.isRequired,
};

PatentApplication.defaultProps = {
  attorneyName: "N/A",
  phoneNumber: "N/A",
  email: "N/A",
};

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
      additionalInfo="This application has been thoroughly reviewed by PCC Admin. All documents are complete and meet initial requirements. The proposed attorney has extensive experience in IoT patents. Recommended for approval with minor revisions to claims section."
    />
  );
}

export default SampleAppDetails;