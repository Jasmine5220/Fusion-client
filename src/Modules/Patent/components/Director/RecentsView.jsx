import React from "react";
import { Box, Button, ScrollArea, Table, Title, Text } from "@mantine/core";
import { Info } from "phosphor-react";
import pendingReviewsData from "../../data/director/PendingReviewsData";
import "../../style/director/RecentsView.css";
import { useNavigate } from "react-router-dom";

function RecentsView({ setActiveTab }) {
  const navigate = useNavigate();
  const columnNames = [
    "Token No.",
    "Patent Title",
    "Submitted By",
    "Department",
    "Arrival Date",
    "Review Date",
    "Attorney",
    "Actions"
  ];

  const handleViewDetails = (application) => {
    console.log("Viewing details for:", application);
    setActiveTab("1.1");
  };

  const rows = pendingReviewsData.map((item, index) => (
    <tr key={index} className="tableRow">
      <td>{item.tokenNumber}</td>
      <td>{item.title}</td>
      <td>{item.submitter}</td>
      <td>{item.Department}</td>
      <td>{item.arrivalDate}</td>
      <td>{item.reviewDate}</td>
      <td>{item.attorney}</td>
      <td>
        <Button
          variant="outline"
          color="blue"
          size="xs"
          onClick={() => handleViewDetails(item)}
          className="viewButton"
        >
          <Info size={16} /> <span> &nbsp; Details</span>
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
        <span>Recently Reviewed Applications</span>
      </Title>
      <Text
        size="md"
        color="dimmed"
        className="description"
        style={{ marginLeft: "64px" }}
      >
        The following is a list of patent applications you've recently reviewed. 
        Click on the "Details" button to see more information or review again.
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

export default RecentsView;