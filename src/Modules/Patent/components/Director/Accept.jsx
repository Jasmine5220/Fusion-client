import React from "react";
import "../../style/Director/Accept.css";
import PropTypes from "prop-types";

function PatentApplication(props) {
  const {
    title,
    date,
    applicantName,
    applicationNumber,
    tokenNumber,
    attorneyName = "N/A",
    phoneNumber = "N/A",
    email = "N/A",
    inventors = [],
    additionalInfo = "No additional information provided.",
  } = props;

  return (
    <div
      className="mainbox"
      style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
    >
      <h2 style={{ textAlign: "center" }}>Title of Patent Application</h2>
      <h1 style={{ textAlign: "center" }}>{title}</h1>

      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>Date: </strong> {date}
        </p>
        <p>
          <strong>Applicant Name: </strong> {applicantName}
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

      {/* Additional Info Section */}
      <div className="info-container">
        <h3>Note From PCC Admin:</h3>
        <p>{additionalInfo}</p>
      </div>

      {/* Buttons */}
      <div className="button-container">
        <button className="accept-btn">Accept</button>
        <button className="reject-btn">Reject</button>
      </div>
    </div>
  );
}

PatentApplication.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  applicantName: PropTypes.string,
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
  additionalInfo: PropTypes.string,
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
      title="Prototype for Visually Impaired"
      date="12/09/2024"
      applicantName="Ashish Kumar Bhoi"
      applicationNumber="234567"
      tokenNumber="TKN001234"
      attorneyName="Lisa Monroe"
      phoneNumber="555-987-6543"
      email="attorney@example.com"
      inventors={inventors} // Passing the inventors array
      additionalInfo="This patent application aims to provide a unique solution for visually impaired individuals using innovative technology."
    />
  );
}

export default SampleInventorsApp;
