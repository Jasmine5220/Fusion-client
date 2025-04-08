import React, { useState } from "react";
import { Box, Button, ScrollArea, Table, Title, Text } from "@mantine/core";
import { Eye } from "@phosphor-icons/react";
import { StatusOfApplicationData } from "./StatusOfApplicationsData";
import SampleAppDetails from "./PCCAStatusView";
import "../../style/Pcc_Admin/StatusOfApplications.css";

function StatusOfApplications() {
  const [selectedApplication, setSelectedApplication] = useState(null);

  const columnNames = [
    "Token Number",
    "Patent Title",
    "Submitted By",
    "Designation",
    "Department",
    "Date - Time",
    "Status",
    "View",
  ];

  const handleViewClick = (tokenNumber) => {
    setSelectedApplication(tokenNumber);
  };

  const handleBackClick = () => {
    setSelectedApplication(null);
  };

  const rows = StatusOfApplicationData.map((application, index) => (
    <tr key={index} className="tableRow">
      <td>{application["Token Number"]}</td>
      <td>{application["Patent Title"]}</td>
      <td>{application["Submitted By"]}</td>
      <td>{application.Designation}</td>
      <td>{application.Department}</td>
      <td>{application["Date - Time"]}</td>
      <td>{application.Status}</td>
      <td>
        <Button
          variant="outline"
          color="blue"
          size="xs"
          onClick={() => handleViewClick(application["Token Number"])}
          className="viewButton"
        >
          <Eye size={16} /> <span> &nbsp; View</span>
        </Button>
      </td>
    </tr>
  ));

  return (
    <Box className="status-applications-container">
      {!selectedApplication ? (
        // List view of applications in table format
        <>
          <Title order={2} className="title">
            Status of Applications
          </Title>
          <Text size="md" color="dimmed" className="description">
            Below is the list of recent patent applications with their current
            status. Click on "View" for more information on each application.
          </Text>
          <Box className="outerContainer">
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
          </Box>
        </>
      ) : (
        // Detailed view of selected application
        <Box className="detail-view-container">
          <Button
            variant="filled"
            color="blue"
            onClick={handleBackClick}
            className="back-button"
          >
            Back to Applications List
          </Button>
          <SampleAppDetails applicationNumber={selectedApplication} />
        </Box>
      )}
    </Box>
  );
}

export default StatusOfApplications;
