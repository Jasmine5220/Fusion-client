import React, { useState } from "react";
import {
  Button,
  ScrollArea,
  Table,
  Text,
  Container,
  Paper,
  Checkbox,
} from "@mantine/core";
import { Eye } from "@phosphor-icons/react";
import AttorneyForm from "./AttorneyForm";
import NewAttorneyForm from "./NewAttorneyForm";
import AttorneyData from "./AttorneyData.jsx";
import "../../style/Pcc_Admin/ManageAttorneys.css";

function ManageAttorneys() {
  const [attorneyData, setAttorneyData] = useState(AttorneyData);
  const [selectedAttorney, setSelectedAttorney] = useState(null);
  const [newAttorneyOpened, setNewAttorneyOpened] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const columnNames = [
    isRemoving ? "Select" : null,
    "S.No.",
    "Attorney Name",
    "Law Firm",
    "Specialization",
    "Assigned Cases",
    "Actions",
  ].filter(Boolean);

  const handleViewClick = (attorney) => {
    setSelectedAttorney(attorney);
  };

  const handleBackClick = () => {
    setSelectedAttorney(null);
  };

  const handleUpdateAttorney = (updatedData) => {
    setAttorneyData(
      attorneyData.map((attorney) =>
        attorney.id === updatedData.id ? updatedData : attorney,
      ),
    );
    setSelectedAttorney(null);
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

  const rows = attorneyData.map((attorney, index) => (
    <tr key={attorney.id} className="tableRow">
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
          size="xs"
          onClick={() => handleViewClick(attorney)}
          className="viewButton"
          leftIcon={<Eye size={16} />}
        >
          View Details
        </Button>
      </td>
    </tr>
  ));

  return (
    <Container className="manage-attorneys-container">
      {!selectedAttorney ? (
        <>
          <Text className="page-heading-title">Manage Attorney Details</Text>
          <Text align="center" mb="md" className="description">
            View attorney details, add new attorneys, and manage existing
            attorneys.
          </Text>

          {/* Action Buttons */}
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
            <ScrollArea>
              <Table
                highlightOnHover
                striped
                withBorder
                className="styledTable"
              >
                <thead className="fusionTableHeader">
                  <tr>
                    {columnNames.map((columnName, index) => (
                      <th key={index}>{columnName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </ScrollArea>
          </Paper>

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

          {/* New Attorney Form */}
          {newAttorneyOpened && (
            <NewAttorneyForm
              onSubmit={handleAddNewAttorney}
              onClose={() => setNewAttorneyOpened(false)}
            />
          )}
        </>
      ) : (
        // Detailed view of selected attorney
        <AttorneyForm
          attorney={selectedAttorney}
          onUpdate={handleUpdateAttorney}
          onBack={handleBackClick}
        />
      )}
    </Container>
  );
}

export default ManageAttorneys;
