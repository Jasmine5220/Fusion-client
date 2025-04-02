import React from "react";
import "../../style/Director/StatusView.css";
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
    <div className="mainbox">
      <h2>Title of Patent Application</h2>
      <h1>{title}</h1>

      <div className="details-container">
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
      <div className="table-container">
        <table>
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
        </table>
      </div>

      <div className="info-container">
        <h3>Note From PCC Admin:</h3>
        <p>{additionalInfo}</p>
      </div>

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
  const inventors = [
    {
      names: "Ashish Kumar Bhoi",
      email: "ashish@gmail.com",
      phone: "123-456-7890",
    },
    {
      names: "Arsh Sinha",
      email: "arsh@gmail.com",
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
      inventors={inventors}
      additionalInfo="This patent application aims to provide a unique solution for visually impaired individuals using innovative technology."
    />
  );
}

export default SampleInventorsApp;