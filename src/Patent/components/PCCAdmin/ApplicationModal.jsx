import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Modal, List, Text } from "@mantine/core";

function ApplicationModal({ isOpen, onClose, applications }) {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Assigned Applications"
      centered
    >
      {applications && applications.length > 0 ? (
        <List>
          {applications.map((app, index) => (
            <List.Item key={index}>
              <Text>
                <strong>ID:</strong> {app.id} - <strong>Title:</strong>{" "}
                {app.title}
              </Text>
              <Text>
                <strong>Status:</strong> {app.status}
              </Text>
              <Text>
                <strong>Description:</strong> {app.description}
              </Text>
            </List.Item>
          ))}
        </List>
      ) : (
        <Text>No applications assigned.</Text>
      )}
    </Modal>
  );
}

// Define PropTypes for the component
ApplicationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ),
};

// Default props in case they are not provided
ApplicationModal.defaultProps = {
  applications: [],
};

export default ApplicationModal;
