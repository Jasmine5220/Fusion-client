import React from "react";
import { Box, Button, ScrollArea, Table, Title, Text } from "@mantine/core";
import { Eye } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { NewApplicationData } from "./ReviewApplicationData";
import "../../style/Pcc_Admin/ReviewApplication.css";

function ReviewApplication() {
  const navigate = useNavigate();
  const columnNames = [
    "Token Number",
    "Patent Title",
    "Submitted By",
    "Designation",
    "Department",
    "Date - Time",
    "View",
  ];

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
          onClick={() =>
            navigate(`/patent/pccAdmin/application/view-details`, {
              state: { application: item },
            })
          }
          className="viewButton"
        >
          <Eye size={16} /> <span> &nbsp; View</span>
        </Button>
      </td>
    </tr>
  ));

  return (
    <Box>
      {/* Title for New Applications Section */}
      <Title
        order={2}
        className="title"
        style={{ marginLeft: "32px", marginTop: "0px" }}
      >
        <span> New Applications</span>
      </Title>
      <Text
        size="md"
        color="dimmed"
        className="description"
        style={{ marginLeft: "64px" }}
      >
        The following is a list of new patent applications that require review.
        Please examine the details and click on the "View" button to see more
        information.
      </Text>
      <Box
        className="outerContainer"
        // style={{ marginLeft: "64px", marginRight: "64px" }}
      >
        <Box className="content" />
        <ScrollArea>
          {/* Wrapper for horizontal scrolling on mobile */}
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

export default ReviewApplication;