import React, { useState } from "react";
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
import AttorneyForm from "./AttorneyForm";
import NewAttorneyForm from "./NewAttorneyForm";
import AttorneyData from "./AttorneyData";
import "../../style/Pcc_Admin/ManageAttorneyAssignment.css";

function ManageAttorneyAssignment() {
  const [attorneyData, setAttorneyData] = useState(AttorneyData);
  const [selectedAttorney, setSelectedAttorney] = useState(null);
  const [viewDetailsOpened, setViewDetailsOpened] = useState(false);
  const [newAttorneyOpened, setNewAttorneyOpened] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Handle view details button
  const handleViewDetails = (attorneyID) => {
    const selected = attorneyData.find(
      (attorney) => attorney.id === attorneyID,
    );
    setSelectedAttorney(selected);
    setViewDetailsOpened(true);
  };

  // Handle add new attorney
  const handleAddNewAttorney = (newAttorney) => {
    const newAttorneyWithId = {
      ...newAttorney,
      id: Math.max(...attorneyData.map((a) => a.id)) + 1,
    };
    setAttorneyData([...attorneyData, newAttorneyWithId]);
    setNewAttorneyOpened(false);
  };

  // Handle update attorney
  const handleUpdateAttorney = (updatedAttorney) => {
    setAttorneyData(
      attorneyData.map((attorney) =>
        attorney.id === updatedAttorney.id ? updatedAttorney : attorney,
      ),
    );
    setViewDetailsOpened(false);
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
      prev.filter((attorney) => !selectedRows.includes(attorney.id)),
    );
    setIsRemoving(false);
    setSelectedRows([]);
  };

  return (
    <Container className="manage-attorney-container">
      <Text className="page-heading-title">Manage Attorney Assignments</Text>
      <Text align="center" mb="md" className="description">
        View attorney details, add new attorneys, and manage existing attorneys.
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
              <th>Law Firm</th>
              <th>Specialization</th>
              <th>Assigned Cases</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attorneyData.map((attorney, index) => (
              <tr key={attorney.id}>
                {isRemoving && (
                  <td>
                    <Checkbox
                      checked={selectedRows.includes(attorney.id)}
                      onChange={() => handleRowSelection(attorney.id)}
                    />
                  </td>
                )}
                <td>{index + 1}</td>
                <td>{attorney.name}</td>
                <td>{attorney.firm_name}</td>
                <td>{attorney.specialization}</td>
                <td>{attorney.assigned_cases}</td>
                <td>
                  <Button
                    variant="outline"
                    color="blue"
                    onClick={() => handleViewDetails(attorney.id)}
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

      {/* View Details Modal */}
      <Modal
        opened={viewDetailsOpened}
        onClose={() => setViewDetailsOpened(false)}
        size="xl"
        title="Attorney Details"
      >
        {selectedAttorney && (
          <AttorneyForm
            attorney={selectedAttorney}
            onUpdate={handleUpdateAttorney}
          />
        )}
      </Modal>

      {/* New Attorney Modal */}
      <Modal
        opened={newAttorneyOpened}
        onClose={() => setNewAttorneyOpened(false)}
        size="md"
        title="Add New Attorney"
      >
        <NewAttorneyForm onSubmit={handleAddNewAttorney} />
      </Modal>

      {/* Remove Selected Button */}
      {isRemoving && selectedRows.length > 0 && (
        <Button
          variant="filled"
          color="red"
          onClick={handleRemoveSelected}
          className="remove-selected-button"
        >
          Remove Selected
        </Button>
      )}
    </Container>
  );
}

export default ManageAttorneyAssignment;
