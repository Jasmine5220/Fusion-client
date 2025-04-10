import React, { useState } from "react";
import { Box, Button, ScrollArea, Table, Title, Text } from "@mantine/core";
import { Eye } from "@phosphor-icons/react";
import { NewApplicationData } from "./ReviewApplicationData";
import PCCStatusView from "./PCCAStatusView";
import "../../style/Pcc_Admin/ReviewApplication.css";

function ReviewApplication() {
  const [selectedApplication, setSelectedApplication] = useState(null);

  const columnNames = [
    "Token Number",
    "Patent Title",
    "Submitted By",
    "Designation",
    "Department",
    "Date - Time",
    "View",
  ];

  const handleViewClick = (application) => {
    setSelectedApplication(application);
  };

  const handleBackClick = () => {
    setSelectedApplication(null);
  };

  const rows = NewApplicationData.map((item, index) => (
    <tr key={index} className="tableRow">
      <td>{item["Token Number"]}</td>
      <td>{item["Patent Title"]}</td>
      <td>{item["Submitted By"]}</td>
      <td>{item.Designation}</td>
      <td>{item.Department}</td>
      <td>{item["Date - Time"]}</td>
      <td>
        <Button
          variant="outline"
          color="blue"
          size="xs"
          onClick={() => handleViewClick(item)}
          className="viewButton"
        >
          <Eye size={16} /> <span> &nbsp; View</span>
        </Button>
      </td>
    </tr>
  ));

  return (
    <Box className="review-applications-container">
      {!selectedApplication ? (
        // List view of applications in table format
        <>
          <Title order={2} className="title">
            New Applications
          </Title>
          <Text size="md" color="dimmed" className="description">
            Below is the list of new patent applications. Click on "View" to see
            more details.
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
          <PCCStatusView application={selectedApplication} />
        </Box>
      )}
    </Box>
  );
}

export default ReviewApplication;
