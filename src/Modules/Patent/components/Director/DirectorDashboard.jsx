import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Text, Divider, Button } from "@mantine/core";
import {
  ClipboardText,
  CheckCircle,
  Hourglass,
  Bell,
} from "@phosphor-icons/react";
import "./DirectorDashboard.css";

function DirectorDashboard({ setActiveTab }) {
  return (
    <Box>
      {/* Page Title */}
      <Text className="title">Director Dashboard</Text>

      {/* Dashboard Sections */}
      <Grid mt="md" className="dashboard-grid">
        {/* Pending Reviews */}
        <Grid.Col span={6}>
          <Box className="dashboard-card pending-reviews">
            <Text className="dashboard-card-title">
              <ClipboardText size={20} className="icon" /> Pending Reviews
            </Text>
            <Divider className="card-divider" />
            <Text size="sm" mt="sm">
              View applications awaiting your final assessment.
            </Text>
            <Button
              variant="light"
              fullWidth
              mt="md"
              size="xs"
              onClick={() => setActiveTab("1")}
              className="dashboard-button"
            >
              View Pending Reviews
            </Button>
          </Box>
        </Grid.Col>

        {/* Reviewed Applications */}
        <Grid.Col span={6}>
          <Box className="dashboard-card reviewed-applications">
            <Text className="dashboard-card-title">
              <CheckCircle size={20} className="icon" /> Reviewed Applications
            </Text>
            <Divider className="card-divider" />
            <Text size="sm" mt="sm">
              Access applications that have already been reviewed.
            </Text>
            <Button
              variant="light"
              fullWidth
              mt="md"
              size="xs"
              onClick={() => setActiveTab("2")}
              className="dashboard-button"
            >
              View Reviewed Applications
            </Button>
          </Box>
        </Grid.Col>

        {/* Active Applications */}
        <Grid.Col span={6}>
          <Box className="dashboard-card active-applications">
            <Text className="dashboard-card-title">
              <Hourglass size={20} className="icon" /> Active Applications
            </Text>
            <Divider className="card-divider" />
            <Text size="sm" mt="sm">
              Monitor currently active applications.
            </Text>
            <Button
              variant="light"
              fullWidth
              mt="md"
              size="xs"
              onClick={() => setActiveTab("3")}
              className="dashboard-button"
            >
              View Active Applications
            </Button>
          </Box>
        </Grid.Col>

        {/* Notifications */}
        <Grid.Col span={6}>
          <Box className="dashboard-card notifications">
            <Text className="dashboard-card-title">
              <Bell size={20} className="icon" /> Notifications
            </Text>
            <Divider className="card-divider" />
            <Text size="sm" mt="sm">
              Stay updated with the latest alerts and updates.
            </Text>
            <Button
              variant="light"
              fullWidth
              mt="md"
              size="xs"
              onClick={() => setActiveTab("4")}
              className="dashboard-button"
            >
              View Notifications
            </Button>
          </Box>
        </Grid.Col>

        {/* New Section for Submitted Applications */}
        <Grid.Col span={6}>
          <Box className="dashboard-card submitted-applications">
            <Text className="dashboard-card-title">
              <ClipboardText size={20} className="icon" /> Submitted Applications
            </Text>
            <Divider className="card-divider" />
            <Text size="sm" mt="sm">
              View applications that have been submitted by PCC Admin.
            </Text>
            <Button
              variant="light"
              fullWidth
              mt="md"
              size="xs"
              onClick={() => setActiveTab("5")}
              className="dashboard-button"
            >
              View Submitted Applications
            </Button>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

// Prop validation
DirectorDashboard.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
};

export default DirectorDashboard;
