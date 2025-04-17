import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ScrollArea,
  Table,
  Title,
  Text,
  Loader,
  Alert,
  Group,
} from "@mantine/core";
import { Eye, ArrowsClockwise } from "@phosphor-icons/react";
import axios from "axios";
import ViewNewApplication from "./ViewNewApplication";
import "../../../style/Pcc_Admin/NewApplication.css";

function NewApplication() {
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const columnNames = [
    "S.No.",
    "Application Number",
    "Patent Title",
    "Inventor 1",
    "Designation",
    "Department",
    "Date",
    "Actions",
  ];

  const fetchApplications = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await axios.get(
        "http://127.0.0.1:8000/patentsystem/pccAdmin/applications/new/",
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        },
      );

      // Transform data into array format
      const applicationsArray = Object.entries(response.data.applications).map(
        ([appId, appData]) => ({
          id: appId,
          ...appData,
        }),
      );

      setApplications(applicationsArray);
      setError(null);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(
        err.response?.data?.message ||
          "Unable to fetch applications. Please try again later.",
      );
    } finally {
      setLoading(false);
      if (showRefresh) {
        setIsRefreshing(false);
      }
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleViewClick = (applicationId) => {
    setSelectedApplicationId(applicationId);
  };

  const handleBackClick = () => {
    setSelectedApplicationId(null);
  };

  const handleRefresh = () => {
    fetchApplications(true);
  };

  const renderApplicationsTable = () => {
    if (loading) {
      return (
        <Box className="loader-container">
          <Loader size="lg" color="blue" />
          <Text mt={10}>Loading applications...</Text>
        </Box>
      );
    }

    if (error) {
      return (
        <Alert color="red" title="Error loading applications">
          {error}
        </Alert>
      );
    }

    if (applications.length === 0) {
      return (
        <Alert color="blue" title="No applications">
          There are no new applications to review at this time.
        </Alert>
      );
    }

    return (
      <ScrollArea className="tableWrapper">
        <Table highlightOnHover striped withBorder className="styledTable">
          <thead className="fusionTableHeader">
            <tr>
              {columnNames.map((columnName, index) => (
                <th key={index}>{columnName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application.id} className="tableRow">
                <td>{index + 1}</td>
                <td>{application.id}</td>
                <td title={application.title}>{application.title}</td>
                <td>{application.submitted_by}</td>
                <td>{application.designation}</td>
                <td>{application.department}</td>
                <td>{application.submitted_on}</td>
                <td>
                  <Button
                    variant="outline"
                    color="blue"
                    size="sm"
                    onClick={() => handleViewClick(application.id)}
                    className="viewButton"
                  >
                    <Eye size={16} /> <span>View</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    );
  };

  return (
    <Box className="review-applications-container">
      {!selectedApplicationId ? (
        // List view of applications in table format
        <>
          <Title order={2} className="title">
            New Applications:
          </Title>
          <Text size="md" color="dimmed" className="description">
            Below is the list of new patent applications. Click on "View" to see
            more details.
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

          <Box className="outerContainer">{renderApplicationsTable()}</Box>
        </>
      ) : (
        // Detailed view of selected application
        <Box className="detail-view-container">
          <ViewNewApplication
            applicationId={selectedApplicationId}
            handleBackToList={handleBackClick}
          />
        </Box>
      )}
    </Box>
  );
}

export default NewApplication;
