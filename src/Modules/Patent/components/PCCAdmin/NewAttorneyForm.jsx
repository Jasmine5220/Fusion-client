import React, { useState } from "react";
import { TextInput, Button, Box, Group, Title } from "@mantine/core";
import {
  UserCircle,
  Briefcase,
  Envelope,
  Phone,
  Tag,
  Info,
} from "phosphor-react";
import PropTypes from "prop-types";
import "../../style/Pcc_Admin/NewAttorneyForm.css";

function NewAttorneyForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    firm_name: "",
    email: "",
    phone: "",
    specialization: "",
    experience_years: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      assigned_cases: 0, // Default value for new attorney
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
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />
      </Group>

      <Group position="center" spacing="md" className="input-group">
        <Briefcase size={28} />
        <TextInput
          label="Law Firm"
          name="firm_name"
          value={formData.firm_name}
          onChange={handleChange}
          className="form-input"
        />
      </Group>

      <Group position="center" spacing="md" className="input-group">
        <Envelope size={28} />
        <TextInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />
      </Group>

      <Group position="center" spacing="md" className="input-group">
        <Phone size={28} />
        <TextInput
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="form-input"
        />
      </Group>

      <Group position="center" spacing="md" className="input-group">
        <Tag size={28} />
        <TextInput
          label="Specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="form-input"
        />
      </Group>

      <Group position="center" spacing="md" className="input-group">
        <Info size={28} />
        <TextInput
          label="Experience Years"
          name="experience_years"
          type="number"
          value={formData.experience_years}
          onChange={handleChange}
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
  onSubmit: PropTypes.func.isRequired,
};

export default NewAttorneyForm;
