import { Grid, Title, Box, Text, Divider } from "@mantine/core";
import { NavLink } from "react-router-dom";
import "./ApplicantDashboard.css"; // Import CSS file

function ApplicantDashboard() {
  return (
    <Box>
      {/* Page Title */}
      <Title order={2} mt="md">
        Applicant Dashboard
      </Title>

      {/* Dashboard Sections */}
      <Grid mt="md">
        <Grid.Col span={6} sm={6} md={3}>
          <Box className="dashboard-card">
            <NavLink
              to="/patent/applicant/applications/submit"
              className="dashboard-link"
              activeclassname="active-link"
            >
              <Text className="dashboard-card-title">
                Submit New Application
              </Text>
              <Divider mt="xs" />
              <Text size="md">Start a new patent application form.</Text>
            </NavLink>
          </Box>
        </Grid.Col>

        <Grid.Col span={6} sm={6} md={3}>
          <Box className="dashboard-card">
            <NavLink
              to="/patent/applicant/applications"
              className="dashboard-link"
              activeclassname="active-link"
            >
              <Text className="dashboard-card-title">View Applications</Text>
              <Divider mt="xs" />
              <Text size="md">
                Check the status of your patent applications.
              </Text>
            </NavLink>
          </Box>
        </Grid.Col>

        <Grid.Col span={6} sm={6} md={3}>
          <Box className="dashboard-card">
            <NavLink
              to="/patent/applicant/drafts"
              className="dashboard-link"
              activeclassname="active-link"
            >
              <Text className="dashboard-card-title">Saved Drafts</Text>
              <Divider mt="xs" />
              <Text size="md">Resume drafting your saved applications.</Text>
            </NavLink>
          </Box>
        </Grid.Col>

        <Grid.Col span={6} sm={6} md={3}>
          <Box className="dashboard-card">
            <NavLink
              to="/patent/applicant/notifications"
              className="dashboard-link"
              activeclassname="active-link"
            >
              <Text className="dashboard-card-title">Notifications</Text>
              <Divider mt="xs" />
              <Text size="md">View your patent-related notifications.</Text>
            </NavLink>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default ApplicantDashboard;
