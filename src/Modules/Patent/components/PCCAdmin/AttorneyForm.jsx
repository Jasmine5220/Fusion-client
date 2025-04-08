import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Text,
  Box,
  Divider,
  Tooltip,
  Button,
  Modal,
  TextInput,
  Paper,
} from "@mantine/core";
import {
  EnvelopeSimple,
  Phone,
  Briefcase,
  Info,
  PencilSimple,
} from "phosphor-react";
import "../../style/Pcc_Admin/AttorneyForm.css";

function AttorneyForm({ attorney, onUpdate }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({ ...attorney });

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleEditSubmit = () => {
    onUpdate(updatedData);
    closeEditModal();
    alert("Details Updated Successfully!");
  };

  return (
    <Paper shadow="sm" radius="md" p="xl" className="attorney-form-container">
      <Text className="attorney-form-header" align="center" mb="xl">
        Attorney Profile
      </Text>

      <Divider my="lg" variant="dashed" />

      <Box className="attorney-details-grid">
        {/* Attorney Details */}
        <div className="detail-item fade-in">
          <Tooltip label="Name of the Attorney" position="right">
            <Text className="attorney-detail">
              <Briefcase size={20} className="icon" />
              <strong>Name:</strong> {attorney.name}
            </Text>
          </Tooltip>
        </div>

        <div className="detail-item fade-in">
          <Tooltip label="Associated Law Firm" position="right">
            <Text className="attorney-detail">
              <Briefcase size={20} className="icon" />
              <strong>Law Firm:</strong> {attorney.firm_name || "Not Available"}
            </Text>
          </Tooltip>
        </div>

        <div className="detail-item fade-in">
          <Tooltip label="Contact Email" position="right">
            <Text className="attorney-detail">
              <EnvelopeSimple size={20} className="icon" />
              <strong>Email:</strong> {attorney.email}
            </Text>
          </Tooltip>
        </div>

        <div className="detail-item fade-in">
          <Tooltip label="Phone Number" position="right">
            <Text className="attorney-detail">
              <Phone size={20} className="icon" />
              <strong>Phone:</strong> {attorney.phone || "Not Available"}
            </Text>
          </Tooltip>
        </div>

        <div className="detail-item fade-in">
          <Tooltip label="Area of Specialization" position="right">
            <Text className="attorney-detail">
              <Info size={20} className="icon" />
              <strong>Specialization:</strong>{" "}
              {attorney.specialization || "Not Available"}
            </Text>
          </Tooltip>
        </div>

        <div className="detail-item fade-in">
          <Tooltip label="Years of Experience" position="right">
            <Text className="attorney-detail">
              <Info size={20} className="icon" />
              <strong>Experience:</strong> {attorney.experience_years} years
            </Text>
          </Tooltip>
        </div>

        <div className="detail-item fade-in">
          <Tooltip label="Assigned Cases" position="right">
            <Text className="attorney-detail">
              <Info size={20} className="icon" />
              <strong>Assigned Cases:</strong> {attorney.assigned_cases}
            </Text>
          </Tooltip>
        </div>
      </Box>

      <Divider my="lg" variant="dashed" />

      {/* Edit Button */}
      <div className="button-container">
        <Button
          fullWidth
          variant="gradient"
          gradient={{ from: "#1c7ed6", to: "#4dabf7" }}
          leftIcon={<PencilSimple size={20} />}
          onClick={openEditModal}
          className="edit-button"
        >
          Edit Details
        </Button>
      </div>

      {/* Edit Details Modal */}
      <Modal
        opened={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Attorney Details"
        centered
        size="lg"
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Box className="edit-form">
          <TextInput
            label="Attorney Name"
            name="name"
            value={updatedData.name}
            onChange={handleInputChange}
            mt="md"
          />
          <TextInput
            label="Law Firm"
            name="firm_name"
            value={updatedData.firm_name}
            onChange={handleInputChange}
            mt="md"
          />
          <TextInput
            label="Email"
            name="email"
            value={updatedData.email}
            onChange={handleInputChange}
            mt="md"
          />
          <TextInput
            label="Phone Number"
            name="phone"
            value={updatedData.phone}
            onChange={handleInputChange}
            mt="md"
          />
          <TextInput
            label="Specialization"
            name="specialization"
            value={updatedData.specialization}
            onChange={handleInputChange}
            mt="md"
          />
          <TextInput
            label="Experience Years"
            name="experience_years"
            type="number"
            value={updatedData.experience_years}
            onChange={handleInputChange}
            mt="md"
          />
          <Button
            onClick={handleEditSubmit}
            variant="gradient"
            gradient={{ from: "#1c7ed6", to: "#4dabf7" }}
            fullWidth
            mt="xl"
            className="save-button"
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
    </Paper>
  );
}

// Define PropTypes for the component
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AttorneyForm;
