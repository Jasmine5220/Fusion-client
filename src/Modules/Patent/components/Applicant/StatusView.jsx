import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Text, Loader, Table } from "@mantine/core";
import "../../style/Applicant/StatusView.css";

// Mock backend call
const fetchApplicationStatus = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Attorney Assignment"), 1000); // Simulating API delay
  });
};

// Progress Bar Component
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

  const steps = [
    "Patent Application Submission",
    "PCC Admin Review",
    "Director Initial Review",
    "Attorney Assignment",
    "Patentability Check",
    "Final Approval by Director",
    "Final Contract Completion",
  ];

  return (
    <div className="progress-bar-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`progress-step ${
              index < currentStep ? "step-green" : "step-gray"
            }`}
            style={{ width: `${100 / steps.length}%` }}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="progress-labels">
        {steps.map((step, index) => (
          <span key={index}>{step.split(" ").join(" ")}</span>
        ))}
      </div>
    </div>
  );
}

PatentProgressBar.propTypes = {
  currentStatus: PropTypes.string.isRequired,
};

// Inventors Table Component
function InventorsTable({ inventors }) {
  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>Inventor's Name</th>
          <th>Email ID</th>
          <th>Phone No.</th>
        </tr>
      </thead>
      <tbody>
        {inventors.map((inventor, index) => (
          <tr key={index}>
            <td>{inventor.names}</td>
            <td>{inventor.email}</td>
            <td>{inventor.phone}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

InventorsTable.propTypes = {
  inventors: PropTypes.arrayOf(
    PropTypes.shape({
      names: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

// Main Application Component
function PatentApplication(props) {
  const {
    title,
    date,
    applicationNumber,
    tokenNumber,
    attorneyName,
    phoneNumber,
    email,
    inventors,
  } = props;

  const [currentStatus, setCurrentStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const status = await fetchApplicationStatus();
      setCurrentStatus(status);
    };

    fetchStatus();
  }, []);

  if (!currentStatus) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Loader size="lg" />
        <Text>Loading application status...</Text>
      </div>
    );
  }

  return (
    <div
      className="mainbox"
      style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
    >
      <h1 style={{ textAlign: "center" }}>{title}</h1>

      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Application No.:</strong> {applicationNumber}
        </p>
        <p>
          <strong>Token No.:</strong> {tokenNumber}
        </p>
        <p>
          <strong>Attorney Name:</strong> {attorneyName}
        </p>
        <p>
          <strong>Phone No.:</strong> {phoneNumber}
        </p>
        <p>
          <strong>Email ID:</strong> {email}
        </p>
      </div>

      <h3>Details of All Inventors:</h3>
      <InventorsTable inventors={inventors} />

      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Status of Application:</strong> {currentStatus}
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Application Progress</h3>
        <PatentProgressBar currentStatus={currentStatus} />
      </div>
    </div>
  );
}

PatentApplication.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  applicationNumber: PropTypes.string.isRequired,
  tokenNumber: PropTypes.string.isRequired,
  attorneyName: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  inventors: PropTypes.arrayOf(
    PropTypes.shape({
      names: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

// Sample App
function SampleInventorsApp() {
  const inventors = [
    {
      names: "Ashish Kumar Bhoi",
      email: "ashish@gmail.com",
      phone: "123-456-7890",
    },
    {
      names: "Shreyash Katkar",
      email: "shreyash@gmail.com",
      phone: "987-654-3210",
    },
    { names: "Aman Kheria", email: "kheria@gmail.com", phone: "555-123-4567" },
  ];

  return (
    <PatentApplication
      title="Wireless Communication System for IoT Devices"
      date="12/09/2024"
      applicationNumber="APP001234"
      tokenNumber="TKN001234"
      attorneyName="John Doe"
      phoneNumber="555-987-6543"
      email="attorney@example.com"
      inventors={inventors}
    />
  );
}

export default SampleInventorsApp;
