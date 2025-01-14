import React, { useState, useEffect } from "react";
import { Table, Button, Container, Modal, Text, Paper } from "@mantine/core";
import { PencilSimple } from "phosphor-react";
import AttorneyDetails from "./AttorneyDetails";
import AttorneyForm from "./AttorneyForm";
import NewAttorneyForm from "./NewAttorneyForm";
import "./ManageAttorneyAssignment.css";

function ManageAttorneyAssignment() {
  const [attorneyData, setAttorneyData] = useState([]);
  const [selectedAttorney, setSelectedAttorney] = useState(null);
  const [viewDetailsOpened, setViewDetailsOpened] = useState(false);
  const [newAttorneyOpened, setNewAttorneyOpened] = useState(false);

  // Fetch attorney data
  useEffect(() => {
    setAttorneyData(AttorneyDetails);
  }, []);

  // Handle view details button
  const handleViewDetails = (attorneyID) => {
    const selected = attorneyData.find(
      (attorney) => attorney.AttorneyID === attorneyID,
    );
    setSelectedAttorney(selected);
    setViewDetailsOpened(true);
    
  };

  // Handle add new attorney
  const handleAddNewAttorney = (newAttorney) => {
    setAttorneyData([...attorneyData, newAttorney]);
    setNewAttorneyOpened(false);
  };

  return (
    <Container className="manage-attorney-container">
      <Text className="page-heading-title">Manage Attorney Assignments</Text>
      <Text align="center" mb="md" className="attorney-page-subtitle">
        View attorney details, assign applications, add new attorneys, reassign
        existing applications, and view feedback.
      </Text>

      {/* New Attorney Button */}
      <Button
        variant="outline"
        color="blue"
        onClick={() => setNewAttorneyOpened(true)}
        className="add-new-attorney-button"
      >
        + Add New Attorney
      </Button>

      <Paper className="table-card">
        <Table striped highlightOnHover className="attorney-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Attorney Name</th>
              <th>Attorney ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attorneyData.map((attorney, index) => (
              <tr key={attorney.AttorneyID}>
                <td>{index + 1}</td>
                <td>{attorney.AttorneyName}</td>
                <td>{attorney.AttorneyID}</td>
                <td>
                  <Button
                    variant="outline"
                    className="view"
                    color="blue"
                    onClick={() => handleViewDetails(attorney.AttorneyID)}
                    leftIcon={<PencilSimple />}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>

      {/* Modal to show attorney form with Edit Button */}
      
      <Modal
  opened={viewDetailsOpened}
  onClose={() => setViewDetailsOpened(false)}
  size="xl" // Wider modal
  centered
  overflow="inside" // Prevents side scroll
  styles={{
    modal: {
      padding: "20px", // Adjust padding to your preference
      maxWidth: "90vw", // Ensures the modal doesn't exceed the viewport width
    },
  }}
>
  {selectedAttorney && <AttorneyForm attorney={selectedAttorney} />}
</Modal>

      {/* Modal for Adding New Attorney */}
      <Modal
        opened={newAttorneyOpened}
        onClose={() => setNewAttorneyOpened(false)}
        size="lg"
        centered
      >
        <NewAttorneyForm onSubmit={handleAddNewAttorney} />
      </Modal>
    </Container>
  );
}

export default ManageAttorneyAssignment;
