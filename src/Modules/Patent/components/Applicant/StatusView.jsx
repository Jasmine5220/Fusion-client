import React from "react";
import "./StatusView.css";
import PropTypes from "prop-types"; // Import PropTypes
import { Progress, Tooltip } from "@mantine/core"; // Import Mantine Progress and Tooltip

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
    status,
    statusImage,
  } = props;

  return (
    <div
      className="mainbox"
      style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
    >
      <h1 style={{ textAlign: "center" }}>Title of Patent Application</h1>
      <h3 style={{ textAlign: "center" }}>{title}</h3>

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
          <strong>Status of Application:</strong> {status}
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
        <Progress.Root size={25}>
          <Tooltip label="Documents – 33Gb">
            <Progress.Section value={20} color="Green">
              <Progress.Label>Application Submit</Progress.Label>
            </Progress.Section>
          </Tooltip>

          <Tooltip label="Photos – 28Gb">
            <Progress.Section value={20} color="cyan">
              <Progress.Label>PCC Review</Progress.Label>
            </Progress.Section>
          </Tooltip>

          <Tooltip label="Other – 15Gb">
            <Progress.Section value={20} color="orange">
              <Progress.Label>Director Review</Progress.Label>
            </Progress.Section>
          </Tooltip>
          <Tooltip label="Other – 15Gb">
            <Progress.Section value={15} color="yellow">
              <Progress.Label>PCC Review</Progress.Label>
            </Progress.Section>
          </Tooltip>
          <Tooltip label="Other – 15Gb">
            <Progress.Section value={15} color="blue">
              <Progress.Label>Attorney Assigned</Progress.Label>
            </Progress.Section>
          </Tooltip>
        </Progress.Root>
      </div>
    </div>
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
      phone: PropTypes.string.isRequired,
    }),
  ),
  status: PropTypes.string.isRequired,
  statusImage: PropTypes.string,
};

// Default props (if any)
PatentApplication.defaultProps = {
  attorneyName: "N/A",
  phoneNumber: "N/A",
  email: "N/A",
  inventors: [],
  statusImage: null,
};

export default PatentApplication;
