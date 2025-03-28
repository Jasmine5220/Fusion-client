import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Modal,
  Text,
  Paper,
  Checkbox,
} from "@mantine/core";
import { PencilSimple } from "phosphor-react";
import AttorneyDetails from "./AttorneyDetails";
import AttorneyForm from "./AttorneyForm";
import NewAttorneyForm from "./NewAttorneyForm";
import "../../style/Pcc_Admin/ManageAttorneyAssignment.css";

function ManageAttorneyAssignment() {
  const [attorneyData, setAttorneyData] = useState([]);
  const [selectedAttorney, setSelectedAttorney] = useState(null);
  const [viewDetailsOpened, setViewDetailsOpened] = useState(false);
  const [newAttorneyOpened, setNewAttorneyOpened] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

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

  // Toggle removing mode
  const toggleRemovingMode = () => {
    setIsRemoving(!isRemoving);
    setSelectedRows([]); // Reset selection
  };

  // Handle row selection for removal
  const handleRowSelection = (attorneyID) => {
    setSelectedRows((prev) => {
      if (prev.includes(attorneyID)) {
        return prev.filter((id) => id !== attorneyID);
      }
      return [...prev, attorneyID];
    });
  };

  // Handle remove selected attorneys
  const handleRemoveSelected = () => {
    setAttorneyData((prev) =>
      prev.filter((attorney) => !selectedRows.includes(attorney.AttorneyID)),
    );
    setIsRemoving(false);
    setSelectedRows([]);
  };

  return (
    <Container className="manage-attorney-container">
      <Text className="page-heading-title">Manage Attorney Assignments</Text>
      <Text align="center" mb="md" className="description">
        View attorney details, assign applications, add new attorneys, reassign
        existing applications, and view feedback.
      </Text>

      {/* New Attorney Button */}
      <div className="button-group">
        <Button
          variant="outline"
          color="blue"
          onClick={() => setNewAttorneyOpened(true)}
          className="add-new-attorney-button"
        >
          + Add New Attorney
        </Button>

        <Button
          variant="outline"
          color="red"
          onClick={toggleRemovingMode}
          className="remove-attorney-button"
        >
          {isRemoving ? "Cancel Remove" : "Remove Attorney"}
        </Button>
      </div>

      <Paper className="table-card">
        <Table striped highlightOnHover className="attorney-table">
          <thead>
            <tr>
              {isRemoving && <th>Select</th>}
              <th>S.No.</th>
              <th>Attorney Name</th>
              <th>Attorney ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attorneyData.map((attorney, index) => (
              <tr key={attorney.AttorneyID}>
                {isRemoving && (
                  <td>
                    <Checkbox
                      checked={selectedRows.includes(attorney.AttorneyID)}
                      onChange={() => handleRowSelection(attorney.AttorneyID)}
                    />
                  </td>
                )}
                <td>{index + 1}</td>
                <td>{attorney.AttorneyName}</td>
                <td>{attorney.AttorneyID}</td>
                <td>
                  <Button
                    variant="outline"
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

      {/* Remove Confirmation */}
      {isRemoving && (
        <div className="remove-selected-button-container">
          <Button
            variant="outline" // Use "outline" to allow the background color to be adjustable
            color={selectedRows.length === 0 ? "blue" : "red"} // Set the color dynamically
            onClick={handleRemoveSelected}
            disabled={selectedRows.length === 0} // Disable button if no rows are selected
            className={`remove-selected-button ${selectedRows.length === 0 ? "no-selection" : "selected"}`}
          >
            Remove Selected ({selectedRows.length})
          </Button>
        </div>
      )}

      {/* Modal to show attorney form with Edit Button */}
      <Modal
        opened={viewDetailsOpened}
        onClose={() => setViewDetailsOpened(false)}
        size="xl"
        centered
        overflow="inside"
        styles={{
          modal: {
            padding: "20px",
            maxWidth: "90vw",
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
