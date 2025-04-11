import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ScrollArea,
  Table,
  Title,
  Text,
  Loader,
  Badge,
  Group,
  Divider,
} from "@mantine/core";
import {
  Eye,
  ArrowLeft,
  ArrowsClockwise,
  Warning,
} from "@phosphor-icons/react";
import axios from "axios";
import PCCAStatusView from "./PCCAStatusView";

function StatusOfApplications() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const columnNames = [
    "Token Number",
    "Patent Title",
    "Submitted By",
    "Designation",
    "Department",
    "Date",
    "Status",
    "View",
  ];

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Not Provided") return "Not Provided";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "gray";

    const statusFormatted = status.trim().toLowerCase();

    if (statusFormatted === "rejected") return "red";

    switch (statusFormatted) {
      case "submitted":
        return "blue";
      case "director's approval received":
      case "patent filed":
        return "green";
      case "attorney assigned":
      case "forwarded for director's review":
      case "forwarded to attorney":
      case "patentability search report generated":
        return "orange";
      default:
        return "gray"; // handles unknown or draft statuses
    }
  };

  const fetchApplications = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await axios.get(
        "http://127.0.0.1:8000/patentsystem/pccAdmin/applications/status/",
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        },
      );

      const formattedApplications = Object.entries(
        response.data.applications,
      ).map(([appId, data]) => ({
        id: appId.split("_")[1] || appId, // Fallback to full ID if no underscore
        token_no: data.token_no || "Not Assigned",
        title: data.title || "Not Provided",
        submitted_by: data.submitted_by || "Not Provided",
        designation: data.designation || "Not Provided",
        department: data.department || "Not Provided",
        submitted_on: data.submitted_on || "Not Provided",
        status: data.status || "Not Provided",
      }));

      setApplications(formattedApplications);
      setError(null);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(
        err.response?.data?.message ||
          "Unable to fetch applications. Please try again later.",
      );
    } finally {
      setLoading(false);
      if (showRefresh === true) {
        setIsRefreshing(false);
      }
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleViewClick = (applicationId) => {
    setSelectedApplication(applicationId);
  };

  const handleRefresh = () => {
    fetchApplications(true);
  };

  if (loading) {
    return (
      <Box className="loading-container">
        <Loader size="lg" color="#4a90e2" />
        <Text mt="md" align="center" size="md" color="#555">
          Loading applications...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="error-container">
        <Group mb="lg" align="center">
          <Warning size={32} color="#ff4d4f" weight="fill" />
          <Text color="#ff4d4f" size="lg" weight={500}>
            Error Loading Applications
          </Text>
        </Group>
        <Text mb="lg" color="#666">
          {error}
        </Text>
        <Button
          onClick={fetchApplications}
          color="blue"
          variant="filled"
          leftIcon={<ArrowsClockwise size={16} />}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (applications.length === 0) {
    return (
      <Box className="empty-container">
        <Text size="lg" align="center" mb="md" weight={500} color="#faad14">
          No applications found
        </Text>
        <Text size="md" align="center" color="#666" mb="lg">
          There are currently no patent applications in the system.
        </Text>
        <Button
          onClick={handleRefresh}
          color="blue"
          variant="filled"
          leftIcon={<ArrowsClockwise size={16} />}
        >
          Refresh
        </Button>
      </Box>
    );
  }

  return (
    <Box className="status-applications-container">
      {!selectedApplication ? (
        <>
          <Title order={2} className="title">
            Status of Applications
          </Title>
          <Text size="md" color="dimmed" className="description">
            Below is the list of recent patent applications with their current
            status. Click on "View" for more information.
          </Text>

          <Group position="right" mb="sm">
            <Button
              variant="subtle"
              color="blue"
              size="sm"
              onClick={handleRefresh}
              loading={isRefreshing}
              leftIcon={<ArrowsClockwise size={16} />}
            >
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </Group>

          <Box className="outerContainer">
            <ScrollArea style={{ height: "calc(100vh - 250px)" }}>
              <Table highlightOnHover striped>
                <thead>
                  <tr>
                    {columnNames.map((columnName, index) => (
                      <th key={index}>{columnName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <tr key={application.id}>
                      <td>{application.token_no}</td>
                      <td title={application.title}>{application.title}</td>
                      <td>{application.submitted_by}</td>
                      <td>{application.designation}</td>
                      <td>{application.department}</td>
                      <td>{formatDate(application.submitted_on)}</td>
                      <td>
                        <Badge
                          color={getStatusColor(application.status)}
                          variant="filled"
                          size="sm"
                        >
                          {application.status}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline"
                          color="blue"
                          size="xs"
                          onClick={() => handleViewClick(application.id)}
                        >
                          <Eye size={16} weight="bold" />
                          <span>View</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ScrollArea>
          </Box>
        </>
      ) : (
        <Box className="detail-view-container">
          <Button
            variant="filled"
            color="blue"
            onClick={() => setSelectedApplication(null)}
            leftIcon={<ArrowLeft size={16} weight="bold" />}
          >
            Back to Applications List
          </Button>
          <Divider my="lg" />
          <PCCAStatusView applicationId={selectedApplication} />
        </Box>
      )}
    </Box>
  );
}

export default StatusOfApplications;
