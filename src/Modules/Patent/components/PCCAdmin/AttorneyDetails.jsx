import React, { useState } from "react";
import { TextInput, Button, Title } from "@mantine/core";
import {
  UserCircle,
  Briefcase,
  Envelope,
  Phone,
  Tag,
  Info,
  ArrowLeft,
} from "phosphor-react";
import PropTypes from "prop-types";
import "../../style/Pcc_Admin/AttorneyDetails.css";

function AttorneyDetails({ attorney, onUpdate, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(attorney);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="attorney-details-container">
      <div className="attorney-details-header">
        <Button
          variant="subtle"
          leftIcon={<ArrowLeft size={20} weight="bold" />}
          onClick={onClose}
          className="attorney-details-back-btn"
        >
          Back
        </Button>
        <Title order={2} className="attorney-details-title">
          Attorney Details
        </Title>
      </div>

      <div className="attorney-details-content">
        <div className="attorney-details-section">
          <div className="attorney-details-field">
            <div className="attorney-details-label">
              <UserCircle size={20} className="attorney-details-icon" />
              <span>Attorney Name</span>
            </div>
            {isEditing ? (
              <TextInput
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="attorney-details-input"
              />
            ) : (
              <div className="attorney-details-item">{attorney.name}</div>
            )}
          </div>

          <div className="attorney-details-field">
            <div className="attorney-details-label">
              <Briefcase size={20} className="attorney-details-icon" />
              <span>Law Firm</span>
            </div>
            {isEditing ? (
              <TextInput
                name="firm_name"
                value={formData.firm_name}
                onChange={handleChange}
                className="attorney-details-input"
              />
            ) : (
              <div className="attorney-details-item">{attorney.firm_name}</div>
            )}
          </div>

          <div className="attorney-details-field">
            <div className="attorney-details-label">
              <Envelope size={20} className="attorney-details-icon" />
              <span>Email</span>
            </div>
            {isEditing ? (
              <TextInput
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="attorney-details-input"
              />
            ) : (
              <div className="attorney-details-item">{attorney.email}</div>
            )}
          </div>
        </div>

        <div className="attorney-details-section">
          <div className="attorney-details-field">
            <div className="attorney-details-label">
              <Phone size={20} className="attorney-details-icon" />
              <span>Phone Number</span>
            </div>
            {isEditing ? (
              <TextInput
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="attorney-details-input"
              />
            ) : (
              <div className="attorney-details-item">{attorney.phone}</div>
            )}
          </div>

          <div className="attorney-details-field">
            <div className="attorney-details-label">
              <Tag size={20} className="attorney-details-icon" />
              <span>Specialization</span>
            </div>
            {isEditing ? (
              <TextInput
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="attorney-details-input"
              />
            ) : (
              <div className="attorney-details-item">
                {attorney.specialization}
              </div>
            )}
          </div>

          <div className="attorney-details-field">
            <div className="attorney-details-label">
              <Info size={20} className="attorney-details-icon" />
              <span>Experience Years</span>
            </div>
            {isEditing ? (
              <TextInput
                name="experience_years"
                type="number"
                value={formData.experience_years}
                onChange={handleChange}
                className="attorney-details-input"
              />
            ) : (
              <div className="attorney-details-item">
                {attorney.experience_years}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="attorney-details-footer">
        {isEditing ? (
          <Button
            variant="filled"
            color="blue"
            onClick={handleSubmit}
            className="attorney-details-submit-btn"
          >
            Save Changes
          </Button>
        ) : (
          <Button
            variant="filled"
            color="blue"
            onClick={() => setIsEditing(true)}
            className="attorney-details-submit-btn"
          >
            Edit Details
          </Button>
        )}
      </div>
    </div>
  );
}

AttorneyDetails.propTypes = {
  attorney: PropTypes.shape({
    name: PropTypes.string.isRequired,
    firm_name: PropTypes.string,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    specialization: PropTypes.string,
    experience_years: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AttorneyDetails;
