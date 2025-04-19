import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ScrollArea,
  Table,
  Text,
  Loader,
  Badge,
  Group,
  Divider,
} from "@mantine/core";
import { Eye, ArrowsClockwise, Warning } from "@phosphor-icons/react";
import axios from "axios";
import ViewOngoingApplication from "./ViewOngoingApplication";

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

  // Styles
  const styles = {
    container: {
      position: "relative",
      width: "100%",
      maxWidth: "100%",
    },
    title: {
      fontSize: "24px",
      fontWeight: 600,
      textAlign: "left",
      margin: "0 20px",
      paddingLeft: "50px",
      position: "relative",
    },
    outerContainer: {
      maxWidth: "100%",
      padding: "24px 50px",
      backgroundColor: "transparent",
      marginLeft: "25px",
      borderRadius: "12px",
      marginBottom: "20px",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0)",
    },
    tableWrapper: {
      overflowX: "auto",
      width: "100%",
      backgroundColor: "inherit",
      paddingBottom: 0,
      marginBottom: 0,
    },
    table: {
      width: "100%",
      minWidth: "100%",
      fontSize: "14px",
      backgroundColor: "#ffffff",
      borderSpacing: 0,
      borderCollapse: "separate",
      borderRadius: "8px",
      overflow: "hidden",
      transition: "all 0.3s ease",
      boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.05)",
    },
    tableHeader: {
      padding: "16px 20px",
      textAlign: "left",
      backgroundColor: "#f2f2f2",
      fontWeight: 600,
      color: "#444",
      position: "sticky",
      top: 0,
      zIndex: 10,
      transition: "background-color 0.2s ease",
      whiteSpace: "nowrap",
    },
    tableRow: {
      backgroundColor: "#ffffff",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: "#f8fbff",
        transform: "translateY(-1px)",
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.05)",
      },
    },
    tableCell: {
      padding: "14px 20px",
      borderTop: "1px solid #f0f0f0",
      verticalAlign: "middle",
    },
    viewButton: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontWeight: 600,
      transition: "all 0.2s ease",
      borderRadius: "6px",
      padding: "8px 12px",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
    },
    loaderContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 0",
    },
    refreshButton: {
      marginLeft: "50px",
      paddingLeft: 0,
    },
    errorContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      textAlign: "center",
    },
    emptyContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      textAlign: "center",
    },
  };

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
      <Box style={styles.loaderContainer}>
        <Loader size="lg" color="#4a90e2" />
        <Text mt="md" align="center" size="md" color="#555">
          Loading applications...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box style={styles.errorContainer}>
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
      <Box style={styles.emptyContainer}>
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
    <Box style={styles.container}>
      {!selectedApplication ? (
        <>
          <Text style={styles.title}>Ongoing Applications</Text>

          <Group position="left" mb="md" style={styles.refreshButton}>
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

          <Box style={styles.outerContainer}>
            <ScrollArea style={{ height: "calc(100vh - 250px)" }}>
              <Table highlightOnHover striped style={styles.table}>
                <thead>
                  <tr>
                    {columnNames.map((name, idx) => (
                      <th key={idx} style={styles.tableHeader}>
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, idx) => (
                    <tr key={app.id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{idx + 1}</td>
                      <td style={styles.tableCell}>{app.id}</td>
                      <td style={styles.tableCell}>{app.token_no}</td>
                      <td style={styles.tableCell} title={app.title}>
                        {app.title}
                      </td>
                      <td style={styles.tableCell}>{app.submitted_by}</td>
                      <td style={styles.tableCell}>{app.designation}</td>
                      <td style={styles.tableCell}>{app.department}</td>
                      <td style={styles.tableCell}>
                        {formatDate(app.submitted_on)}
                      </td>
                      <td style={styles.tableCell}>
                        <Badge
                          color={getStatusColor(app.status)}
                          variant="filled"
                          size="sm"
                        >
                          {app.status}
                        </Badge>
                      </td>
                      <td style={styles.tableCell}>
                        <Button
                          variant="outline"
                          color="blue"
                          size="xs"
                          style={styles.viewButton}
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
        <Box style={styles.container}>
          <Divider my="lg" />
          <ViewOngoingApplication applicationId={selectedApplication} />
        </Box>
      )}
    </Box>
  );
}

export default OngoingApplication;
