import React, { useEffect, useState } from "react";
import { Box, ScrollArea, Table, Title, Text } from "@mantine/core";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/patentsystem";

function ReviewedApplications() {
  const [applicationsData, setApplicationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem("authToken");

  const columnNames = [
    "Application ID",
    "Token Number",
    "Patent Title",
    "Submitted By",
    "Department",
    "Arrival Date",
    "Reviewed Date",
    "Assigned Attorney",
    "Current Status",
  ];

  useEffect(() => {
    const fetchReviewedApplications = async () => {
      if (!authToken) {
        setError("Authorization token is missing. Please login again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/director/reviewedapplications`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          },
        );

        const formattedData = Object.entries(response.data.applications).map(
          ([key, app]) => ({
            applicationId: key,
            tokenNumber: app.token_no,
            title: app.title,
            submitter: app.submitted_by,
            department: app.department,
            arrivalDate: new Date(app.arrival_date).toLocaleDateString(),
            reviewedDate: app.reviewed_date
              ? new Date(app.reviewed_date).toLocaleDateString()
              : "N/A",
            assignedAttorney: app.assigned_attorney,
            currentStatus: app.current_status,
          }),
        );

        setApplicationsData(formattedData);
        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch reviewed applications",
        );
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewedApplications();
  }, [authToken]);

  const rows = applicationsData.map((item, index) => (
    <tr key={index} className="tableRow">
      <td>{item.applicationId}</td>
      <td>{item.tokenNumber}</td>
      <td>{item.title}</td>
      <td>{item.submitter}</td>
      <td>{item.department}</td>
      <td>{item.arrivalDate}</td>
      <td>{item.reviewedDate}</td>
      <td>{item.assignedAttorney}</td>
      <td>
        <Text
          color={
            item.currentStatus === "Patent Granted"
              ? "green"
              : item.currentStatus === "Patent Refused"
                ? "red"
                : "blue"
          }
        >
          {item.currentStatus}
        </Text>
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
        Reviewed Patent Applications
      </Title>

      <Text
        size="md"
        color="dimmed"
        className="description"
        style={{ marginLeft: "64px" }}
      >
        List of applications that have been reviewed and their current status in
        the patent process
      </Text>

      <Box className="outerContainer">
        {loading ? (
          <Text align="center" py="md">
            Loading reviewed applications...
          </Text>
        ) : error ? (
          <Text color="red" align="center" py="md">
            Error: {error}
          </Text>
        ) : applicationsData.length === 0 ? (
          <Text align="center" py="md">
            No reviewed applications found
          </Text>
        ) : (
          <ScrollArea>
            <div className="tableWrapper">
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
            </div>
          </ScrollArea>
        )}
      </Box>
    </Box>
  );
}

ReviewedApplications.propTypes = {
  // Removed setActiveTab since it's not used anymore
};

export default ReviewedApplications;
