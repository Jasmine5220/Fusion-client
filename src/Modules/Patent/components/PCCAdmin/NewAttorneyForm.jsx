import React, { useState } from "react";
import { TextInput, Button, Box, Group, Select, Title } from "@mantine/core";
import {
  UserCircle,
  Briefcase,
  Envelope,
  Phone,
  Tag,
  CurrencyDollar,
  FileText,
} from "phosphor-react";
import PropTypes from "prop-types"; // Import PropTypes
import "../../style/Pcc_Admin/NewAttorneyForm.css";

function NewAttorneyForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    AttorneyName: "",
    LawFirm: "",
    Email: "",
    PhoneNumber: "",
    Specialization: "",
    AttorneyFee: "",
    AssignedApplication: "",
  });

  const applicationOptions = [
    { value: "101", label: "101 - Patent for AI Diagnosis" },
    { value: "102", label: "102 - Machine Learning Optimization" },
    { value: "103", label: "103 - Blockchain Innovations" },
    // Add more options as needed
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, AssignedApplication: value });
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      AttorneyID: Math.random().toString(36).substring(2, 9),
    });
  };

  return (
    <Box className="new-attorney-form-container">
      <Title align="center" order={2} className="form-title">
        New Attorney Form
      </Title>

      <Group position="center" spacing="md" className="input-group">
        <UserCircle size={28} />
        <TextInput
          label="Attorney Name"
          name="AttorneyName"
          value={formData.AttorneyName}
          onChange={handleChange}
          required
          className="form-input"
        />
      </Group>

      <Group position="center" spacing="md" className="input-group">
        <Briefcase size={28} />
        <TextInput
          label="Law Firm"
          name="LawFirm"
          value={formData.LawFirm}
          onChange={handleChange}
          required
          className="form-input"
        />
      </Group>

      <Group position="center" spacing="md" className="input-group">
        <Envelope size={28} />
        <TextInput
          label="Email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          required
          className="form-input"
        />
      </Group>

      <Group position="center" spacing="md" className="input-group">
        <Phone size={28} />
        <TextInput
          label="Phone Number"
          name="PhoneNumber"
          value={formData.PhoneNumber}
          onChange={handleChange}
          required
          className="form-input"
        />
      </Group>

      <Group position="center" spacing="md" className="input-group">
        <Tag size={28} />
        <TextInput
          label="Specialization"
          name="Specialization"
          value={formData.Specialization}
          onChange={handleChange}
          required
          className="form-input"
        />
      </Group>

      <Group position="center" spacing="md" className="input-group">
        <CurrencyDollar size={28} />
        <TextInput
          label="Attorney Fee"
          name="AttorneyFee"
          value={formData.AttorneyFee}
          onChange={handleChange}
          required
          className="form-input"
        />
      </Group>

      <Group position="center" spacing="md" className="input-group">
        <FileText size={28} />
        <Select
          label="Assign to Application"
          placeholder="Select Application"
          data={applicationOptions}
          value={formData.AssignedApplication}
          onChange={handleSelectChange}
          required
          className="form-input"
        />
      </Group>

      <Button
        fullWidth
        variant="filled"
        color="blue"
        onClick={handleSubmit}
        className="submitbutton"
      >
        Submit
      </Button>
    </Box>
  );
}

NewAttorneyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Define the type for onSubmit
};

export default NewAttorneyForm;
