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
import { Eye, ArrowsClockwise, Warning } from "@phosphor-icons/react";
import axios from "axios";
import ViewOngoingApplication from "./ViewOngoingApplication";
import "../../../style/Pcc_Admin/OngoingApplication.css";

function OngoingApplication() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const columnNames = [
    "S.No",
    "Application Number",
    "Token Number",
    "Patent Title",
    "Inventor 1",
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

    const formatted = status.trim().toLowerCase();

    switch (formatted) {
      case "forwarded for director's review":
        return "indigo";
      case "director's approval received":
        return "teal";
      case "patentability check started":
        return "violet";
      case "patentability check completed":
        return "cyan";
      case "patentability search report generated":
        return "blue";
      case "patent filed":
        return "green";
      default:
        return "gray";
    }
  };

  const fetchApplications = async (refresh = false) => {
    try {
      // Fixed version
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }
      const { data } = await axios.get(
        "http://127.0.0.1:8000/patentsystem/pccAdmin/applications/ongoing/",
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        },
      );

      const formatted = Object.entries(data.applications)
        .map(([id, details]) => ({
          id: id.split("_")[1] || id,
          token_no: details.token_no || "Not Assigned",
          title: details.title || "Not Provided",
          submitted_by: details.submitted_by || "Not Provided",
          designation: details.designation || "Not Provided",
          department: details.department || "Not Provided",
          submitted_on: details.submitted_on || "Not Provided",
          status: details.status || "Not Provided",
        }))
        .sort((a, b) => {
          if (a.submitted_on === "Not Provided") return 1;
          if (b.submitted_on === "Not Provided") return -1;
          return new Date(b.submitted_on) - new Date(a.submitted_on);
        });

      setApplications(formatted);
      setError(null);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(
        err.response?.data?.message ||
          "Unable to fetch applications. Please try again later.",
      );
    } finally {
      setLoading(false);
      if (refresh) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchApplications();
    })();
  }, []);

  const handleViewClick = (id) => setSelectedApplication(id);
  const handleRefresh = () => fetchApplications(true);

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
          <Title order={2} className="status-title">
            Ongoing Applications
          </Title>

          <Group position="left" mb="md">
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
                    {columnNames.map((name, idx) => (
                      <th key={idx}>{name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, idx) => (
                    <tr key={app.id}>
                      <td>{idx + 1}</td>
                      <td>{app.id}</td>
                      <td>{app.token_no}</td>
                      <td title={app.title}>{app.title}</td>
                      <td>{app.submitted_by}</td>
                      <td>{app.designation}</td>
                      <td>{app.department}</td>
                      <td>{formatDate(app.submitted_on)}</td>
                      <td>
                        <Badge
                          color={getStatusColor(app.status)}
                          variant="filled"
                          size="sm"
                        >
                          {app.status}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline"
                          color="blue"
                          size="xs"
                          className="view-button"
                          onClick={() => handleViewClick(app.id)}
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
          {/* <Button
            variant="filled"
            color="blue"
            onClick={() => setSelectedApplication(null)}
            leftIcon={<ArrowLeft size={16} weight="bold" />}
            className="back-button"
          >
            Back to Applications List
          </Button> */}
          <Divider my="lg" />
          <ViewOngoingApplication applicationId={selectedApplication} />
        </Box>
      )}
    </Box>
  );
}

export default OngoingApplication;
