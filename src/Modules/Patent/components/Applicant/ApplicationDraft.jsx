import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Text, Box, Anchor, Grid } from "@mantine/core";
import { ArrowRight } from "phosphor-react";
import "./ApplicantDraft.css"; // Import the CSS file
import { Link } from "react-router-dom";
import CustomBreadcrumbs from "../../../../components/Breadcrumbs";

// Dummy data for saved drafts
const savedDraftsData = [
  {
    title: "Title of Patent Application",
    savedDate: "DD/MM/YYYY",
    savedTime: "HH:MM:SS",
    borderColor: "lightblue",
  },
  {
    title: "Title of Patent Application",
    savedDate: "DD/MM/YYYY",
    savedTime: "HH:MM:SS",
    borderColor: "lightblue",
  },
  {
    title: "Title of Patent Application",
    savedDate: "DD/MM/YYYY",
    savedTime: "HH:MM:SS",
    borderColor: "lightblue",
  },
];

// Saved draft card component
function SavedDraftCard({ title, savedDate, savedTime, borderColor }) {
  return (
    <Card
      className="saved-draft-card"
      style={{ borderLeft: `6px solid ${borderColor}` }}
    >
      <Text className="card-title">{title}</Text>
      <Text className="card-details">
        Last Saved on: {savedDate} | {savedTime}
      </Text>
      <br />
      <Button
        variant="outline"
        leftIcon={<ArrowRight size={16} />}
        className="button"
      >
        View Draft
      </Button>
    </Card>
  );
}

// PropTypes validation for SavedDraftCard
SavedDraftCard.propTypes = {
  title: PropTypes.string.isRequired,
  savedDate: PropTypes.string.isRequired,
  savedTime: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
};

// Main SavedDraftsPage component
function SavedDraftsPage() {
  return (
    <Box style={{ padding: "24px" }}>
      {/* Breadcrumb navigation */}
      <CustomBreadcrumbs />{" "}
      {/* Replaced breadcrumb text with CustomBreadcrumbs */}
      {/* Page Title */}
      <Text className="page-title">Saved Drafts</Text>
      {/* Tab options */}
      <Box className="tab-container">
        <Anchor
          component={Link}
          to="/patent/applicant/applications/submit"
          underline={false}
        >
          Submit New Application
        </Anchor>
        <Anchor
          component={Link}
          to="/patent/applicant/applications"
          underline={false}
        >
          View Applications
        </Anchor>
        <Text size="sm" className="active">
          Saved Drafts
        </Text>

        <Anchor
          component={Link}
          to="/patent/applicant/notifications"
          underline={false}
        >
          Notifications
        </Anchor>
      </Box>
      <Grid>
        {savedDraftsData.map((draft, index) => (
          <Grid.Col span={4} key={index}>
            <SavedDraftCard
              title={draft.title}
              savedDate={draft.savedDate}
              savedTime={draft.savedTime}
              borderColor={draft.borderColor}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}

export default SavedDraftsPage;
