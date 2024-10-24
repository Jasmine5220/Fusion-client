import React, { useState, useEffect } from "react";
import "./StatusView.css";
import PropTypes from "prop-types";
import { Progress, Text, Group, Box } from "@mantine/core";

// Simulate fetching status from backend
const fetchApplicationStatus = async () => {
  // Replace this with actual backend API call
  return "Attorney Assignment"; // Default for now
};

function PatentProgressBar({ currentStatus }) {
  // Determine progress based on status
  const progressMapping = {
    "Patent Application Submission": 1,
    "PCC Admin Review": 2,
    "Director Initial Review": 3,
    "Attorney Assignment": 4, // Default until this step for now
    "Patentability Check": 5,
    "Final Approval by Director": 6,
    "Final Contract Completion": 7,
  };

  const currentStep = progressMapping[currentStatus] || 1;

  return (
    <Box style={{ width: "80%", margin: "0 auto" }}>
      <Progress
        sections={[
          { value: 15, color: currentStep >= 1 ? "green" : "gray" }, // Patent Application Submission
          { value: 12, color: currentStep >= 2 ? "green" : "gray" }, // PCC Admin Review
          { value: 12, color: currentStep >= 3 ? "green" : "gray" }, // Director Initial Review
          { value: 12, color: currentStep >= 4 ? "green" : "gray" }, // Attorney Assignment
          { value: 12, color: currentStep >= 5 ? "green" : "gray" }, // Patentability Check
          { value: 12, color: currentStep >= 6 ? "green" : "gray" }, // Final Approval by Director
          { value: 12, color: currentStep >= 7 ? "green" : "gray" }, // Final Contract Completion
        ]}
        size={10}
        radius="md"
      />

      <Group position="apart" mt="md">
        <Text size="xs" align="center" style={{ width: "15%" }}>
          Patent Application <br /> Submission
        </Text>
        <Text size="xs" align="center" style={{ width: "12%" }}>
          PCC Admin <br /> Review
        </Text>
        <Text size="xs" align="center" style={{ width: "12%" }}>
          Director <br /> Initial Review
        </Text>
        <Text size="xs" align="center" style={{ width: "12%" }}>
          Assignment of <br /> Attorney
        </Text>
        <Text size="xs" align="center" style={{ width: "12%" }}>
          Patentability <br /> Check
        </Text>
        <Text size="xs" align="center" style={{ width: "12%" }}>
          Final Approval <br /> by Director
        </Text>
        <Text size="xs" align="center" style={{ width: "12%" }}>
          Final Contract <br /> Completion
        </Text>
      </Group>
    </Box>
  );
}

PatentProgressBar.propTypes = {
  currentStatus: PropTypes.string,
};

function PatentApplication(props) {
  const {
    title,
    date,
    applicationNumber,
    tokenNumber,
    attorneyName = "N/A",
    phoneNumber = "N/A",
    email = "N/A",
    inventors = [],
    statusImage,
  } = props;

  const [currentStatus, setCurrentStatus] = useState(
    "Patent Application Submission",
  );

  useEffect(() => {
    const getStatus = async () => {
      const status = await fetchApplicationStatus(); // Fetch status from backend
      setCurrentStatus(status);
    };

    getStatus();
  }, []);

  return (
    <div
      className="mainbox"
      style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
    >
      <h1 style={{ textAlign: "center" }}>Title of Patent Application</h1>
      <h3 style={{ textAlign: "center" }}>{title}</h3>

      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>Date: </strong> {date}
        </p>
        <p>
          <strong>Application No.: </strong> {applicationNumber}
        </p>
        <p>
          <strong>Token No.: </strong> {tokenNumber}
        </p>
        <p>
          <strong>Attorney Name: </strong> {attorneyName}
        </p>
        <p>
          <strong>Phone No.: </strong> {phoneNumber}
        </p>
        <p>
          <strong>Email ID: </strong> {email}
        </p>
      </div>

      <h3>Details of All Inventors:</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Inventor's Name
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Email ID
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Phone No.
            </th>
          </tr>
        </thead>
        <tbody>
          {inventors.map((inventor, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {inventor.names}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {inventor.email}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {inventor.phone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Status of Application:</strong> {currentStatus}
        </p>
        {statusImage && (
          <img
            src={statusImage}
            alt="Status"
            style={{ width: "100px", marginTop: "10px" }}
          />
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Application Progress</h3>
        {/* Render the progress bar and pass the current status */}
        <PatentProgressBar currentStatus={currentStatus} />
      </div>
    </div>
  );
}

PatentApplication.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  applicationNumber: PropTypes.string,
  tokenNumber: PropTypes.string,
  attorneyName: PropTypes.string,
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  inventors: PropTypes.arrayOf(
    PropTypes.shape({
      names: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }),
  ),
  statusImage: PropTypes.string,
};

PatentApplication.defaultProps = {
  attorneyName: "N/A",
  phoneNumber: "N/A",
  email: "N/A",
  inventors: [],
  statusImage: null,
};

// Sample usage with inventors
function SampleInventorsApp() {
  // Sample inventor array
  const inventors = [
    {
      names: "Ashish Kumar Bhoi",
      email: "ashish@gmail.com",
      phone: "123-456-7890",
    },
    {
      names: "Shreyas Katkar",
      email: "shreyas@gmail.com",
      phone: "987-654-3210",
    },
    {
      names: "Aman Kheria",
      email: "kheria@gmail.com",
      phone: "555-123-4567",
    },
  ];

  return (
    <PatentApplication
      title="Innovative Gadget"
      date="24/10/2024"
      applicationNumber="123456789"
      tokenNumber="987654321"
      attorneyName="XYZ"
      phoneNumber="555-987-6543"
      email="attorney@example.com"
      inventors={inventors} // Passing the inventors array
      statusImage=""
    />
  );
}

export default SampleInventorsApp;
