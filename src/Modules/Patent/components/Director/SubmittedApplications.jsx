import React from "react";
import { Box, Button, ScrollArea, Table, Title, Text } from "@mantine/core";
import { Eye } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import submittedApplicationsData from "../../data/director/submittedApplicationsData";
import "../../style/director/SubmittedApplications.css";

function SubmittedApplications({ setActiveTab }) {
  const navigate = useNavigate();
  const columnNames = [
    "Token Number",
    "Patent Title",
    "Submitted By",
    "Department",
    "Date-Time",
    "Assigned Attorney",
    "View",
  ];

  const handleViewDetails = (applicationId) => {
    console.log(`Viewing details for application ID: ${applicationId}`);
    setActiveTab("1.1");
  };

  const rows = submittedApplicationsData.map((item, index) => (
    <tr key={index} className="tableRow">
      <td>{item.tokenNumber}</td>
      <td>{item.title}</td>
      <td>{item.submitter}</td>
      <td>{item.Department}</td>
      <td>{item.date}</td>
      <td>{item.attorney}</td>
      <td>
        <Button
          variant="outline"
          color="blue"
          size="xs"
          onClick={() => handleViewDetails(item)}
          className="viewButton"
        >
          <Eye size={16} /> <span> &nbsp; View</span>
        </Button>
      </td>
    </tr>
  ));

  return (
    <Box>
      <Title
        order={2}
        className="title"
        style={{ marginLeft: "32px", marginTop: "0px" }}
      >
        <span>Applications Forwarded by PCC Admin</span>
      </Title>
      <Text
        size="md"
        color="dimmed"
        className="description"
        style={{ marginLeft: "64px" }}
      >
        The following is a list of patent applications forwarded by PCC Admin for
        your review. Please examine the details and click on the "View" button to see more
        information.
      </Text>
      <Box className="outerContainer">
        <ScrollArea>
          <div className="tableWrapper">
            <Table highlightOnHover striped withBorder className="styledTable">
              <thead className="fusionTableHeader">
                <tr>
                  {columnNames.map((columnName, index) => (
                    <th key={index}>{columnName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>
        </ScrollArea>
      </Box>
    </Box>
  );
}

export default SubmittedApplications;