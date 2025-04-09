import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, Box, Tooltip, Button, TextInput } from "@mantine/core";
import {
  EnvelopeSimple,
  Phone,
  Briefcase,
  Info,
  PencilSimple,
  Check,
  X,
  CaretLeft,
} from "phosphor-react";
import "../../style/Pcc_Admin/AttorneyForm.css";

function AttorneyForm({ attorney, onUpdate, onBack }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({ ...attorney });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleEditSubmit = () => {
    onUpdate(updatedData);
    setIsEditing(false);
    alert("Details Updated Successfully!");
  };

  const handleCancel = () => {
    setUpdatedData({ ...attorney });
    setIsEditing(false);
  };

  return (
    <div className="attorney-details-container">
      {/* Header with Back and Edit Buttons */}
      <div className="top-nav-container">
        <Button
          variant="subtle"
          leftIcon={<CaretLeft size={20} weight="bold" />}
          onClick={onBack}
          className="attorney-back-btn"
        >
          Back
        </Button>
        {isEditing ? (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              variant="outline"
              color="blue"
              leftIcon={<Check size={20} />}
              onClick={handleEditSubmit}
              className="save-button"
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              color="red"
              leftIcon={<X size={20} />}
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            color="blue"
            leftIcon={<PencilSimple size={20} />}
            onClick={() => setIsEditing(true)}
            className="edit-details-button"
          >
            Edit Details
          </Button>
        )}
      </div>

      {/* Attorney Details Heading */}
      <Text className="attorney-details-heading">Details of Attorney</Text>

      {/* Attorney Details Grid */}
      <Box className="attorney-details-grid">
        <div className={`detail-item ${isEditing ? "editing" : ""}`}>
          <Tooltip label="Name of the Attorney" position="right">
            {isEditing ? (
              <TextInput
                label="Name"
                name="name"
                value={updatedData.name}
                onChange={handleInputChange}
                className="edit-input"
                required
              />
            ) : (
              <Text className="attorney-detail">
                <Briefcase size={20} className="icon" />
                <strong>Name:</strong> {attorney.name}
              </Text>
            )}
          </Tooltip>
        </div>

        <div className={`detail-item ${isEditing ? "editing" : ""}`}>
          <Tooltip label="Law Firm" position="right">
            {isEditing ? (
              <TextInput
                label="Law Firm"
                name="firm_name"
                value={updatedData.firm_name}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <Text className="attorney-detail">
                <Briefcase size={20} className="icon" />
                <strong>Law Firm:</strong>{" "}
                {attorney.firm_name || "Not Available"}
              </Text>
            )}
          </Tooltip>
        </div>

        <div className={`detail-item ${isEditing ? "editing" : ""}`}>
          <Tooltip label="Email Address" position="right">
            {isEditing ? (
              <TextInput
                label="Email"
                name="email"
                value={updatedData.email}
                onChange={handleInputChange}
                className="edit-input"
                required
              />
            ) : (
              <Text className="attorney-detail">
                <EnvelopeSimple size={20} className="icon" />
                <strong>Email:</strong> {attorney.email}
              </Text>
            )}
          </Tooltip>
        </div>

        <div className={`detail-item ${isEditing ? "editing" : ""}`}>
          <Tooltip label="Contact Number" position="right">
            {isEditing ? (
              <TextInput
                label="Phone"
                name="phone"
                value={updatedData.phone}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <Text className="attorney-detail">
                <Phone size={20} className="icon" />
                <strong>Phone:</strong> {attorney.phone || "Not Available"}
              </Text>
            )}
          </Tooltip>
        </div>

        <div className={`detail-item ${isEditing ? "editing" : ""}`}>
          <Tooltip label="Area of Expertise" position="right">
            {isEditing ? (
              <TextInput
                label="Specialization"
                name="specialization"
                value={updatedData.specialization}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <Text className="attorney-detail">
                <Info size={20} className="icon" />
                <strong>Expertise:</strong>{" "}
                {attorney.specialization || "Not Available"}
              </Text>
            )}
          </Tooltip>
        </div>

        <div className={`detail-item ${isEditing ? "editing" : ""}`}>
          <Tooltip label="Years of Experience" position="right">
            {isEditing ? (
              <TextInput
                label="Experience Years"
                name="experience_years"
                type="number"
                value={updatedData.experience_years}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <Text className="attorney-detail">
                <Info size={20} className="icon" />
                <strong>Years:</strong> {attorney.experience_years} years
              </Text>
            )}
          </Tooltip>
        </div>

        {/* Assigned Cases Section - Full Width */}
        <div
          className={`detail-item assigned-cases ${isEditing ? "editing" : ""}`}
        >
          <Text className="attorney-detail">
            <Briefcase size={20} className="icon" />
            <strong>Assigned Cases:</strong> {attorney.assigned_cases || 0}
          </Text>
          {attorney.assigned_applications &&
          attorney.assigned_applications.length > 0 ? (
            <div className="assigned-cases-list">
              {attorney.assigned_applications.map((app) => (
                <div key={app.id} className="assigned-case-item">
                  <Text>
                    <strong>Application {app.id}</strong>
                    {app.title}
                  </Text>
                </div>
              ))}
            </div>
          ) : (
            <Text className="no-applications-text" color="dimmed" size="sm">
              No applications assigned
            </Text>
          )}
        </div>
      </Box>
    </div>
  );
}

// Update PropTypes to include assigned_applications
AttorneyForm.propTypes = {
  attorney: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    firm_name: PropTypes.string,
    experience_years: PropTypes.number,
    specialization: PropTypes.string,
    assigned_cases: PropTypes.number,
    assigned_applications: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default AttorneyForm;
