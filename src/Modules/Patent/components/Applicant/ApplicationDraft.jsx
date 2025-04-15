import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Button,
  Text,
  Box,
  Modal,
  Divider,
  Group,
  Center,
  ThemeIcon,
} from "@mantine/core";
import { ArrowRight, Download, FileText } from "phosphor-react";
import "../../style/Applicant/ApplicationDraft.css";

// Static data for saved drafts
const savedDraftsData = [
  {
    title: "Draft 1",
    savedDate: "12/09/2024",
    savedTime: "14:30:45",
    description:
      "This patent draft focuses on an AI-based approach to optimize industrial processes, aiming to reduce energy consumption and increase efficiency.",
    content: "Detailed content of Draft 1 for the patent application.",
  },
  {
    title: "Draft 2",
    savedDate: "08/09/2024",
    savedTime: "13:20:30",
    description:
      "This draft introduces a cost-effective and accurate imaging system for medical diagnostics, utilizing advanced neural networks.",
    content: "Detailed content of Draft 2 for the patent application.",
  },
  {
    title: "Draft 3",
    savedDate: "05/09/2024",
    savedTime: "11:15:50",
    description:
      "This patent explores renewable energy storage solutions with a focus on improving scalability and efficiency for large-scale applications.",
    content: "Detailed content of Draft 3 for the patent application.",
  },
];

// Saved draft card component
function SavedDraftCard({ title, savedDate, savedTime, description, onViewDraft }) {  
  return (
    <Card className="saved-draft-card">
      <Text className="card-title" weight={600} size="lg">
        {title}
      </Text>
      <Text className="card-details" size="sm" color="dimmed">
        Last Saved on: {savedDate} | {savedTime}
      </Text>
      <Divider my="sm" />
      <Text className="card-description" size="sm">
        {description}
      </Text>
      <Button
        variant="light"
        leftIcon={<ArrowRight size={16} />}
        className="viewDraftButton"
        onClick={onViewDraft}
        fullWidth
        mt="sm"
      >
        View Draft
      </Button>
    </Card>
  );
}

// Empty state component
function EmptyDraftsState() {
  return (
    <Card className="saved-draft-card empty-state-card">
      <Center style={{ flexDirection: 'column', padding: '40px 20px' }}>
        <ThemeIcon 
          size="xl" 
          radius="xl" 
          variant="light"
          color="blue"
          mb="md"
        >
          <FileText size={24} />
        </ThemeIcon>
        <Text size="xl" weight={600} mb="xs" align="center">
          No Drafts Available
        </Text>
        <Text size="sm" color="dimmed" align="center" mb="md">
          You haven't saved any patent application drafts yet.
        </Text>
        <Divider my="sm" style={{ width: '100%' }} />
        <Button
          variant="outline"
          leftIcon={<ArrowRight size={16} />}
          mt="md"
          onClick={() => {
            // Add navigation to create new draft
            console.log("Navigate to create new draft");
          }}
        >
          Start New Application
        </Button>
      </Center>
    </Card>
  );
}

// Main SavedDraftsPage component
function SavedDraftsPage() {
  const [opened, setOpened] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState(null);
  // const [drafts, setDrafts] = useState(savedDraftsData); // Using dummy data
  const [drafts, setDrafts] = useState([]); // For Empty Draft Page
  const handleViewDraft = (draft) => {
    setSelectedDraft(draft);
    setOpened(true);
  };

  return (
    <Box style={{ padding: "16px" }}>
      <Text className="draft-header-text" size="xl" weight={700}>
        Saved Drafts
      </Text>

      <Box className="draft-app-container">
        {drafts.length > 0 ? (
          drafts.map((draft, index) => (
            <SavedDraftCard
              key={index}
              title={draft.title}
              savedDate={draft.savedDate}
              savedTime={draft.savedTime}
              description={draft.description}
              onViewDraft={() => handleViewDraft(draft)}
            />
          ))
        ) : (
          <EmptyDraftsState />
        )}
      </Box>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={selectedDraft ? selectedDraft.title : ""}
        size="lg"
      >
        {selectedDraft && (
          <Box>
            <Text className="modal-details" size="sm" weight={500}>
              Last Saved on: {selectedDraft.savedDate} | {selectedDraft.savedTime}
            </Text>
            <Divider my="sm" />
            <Text className="modal-description" size="sm" weight={600}>
              Description:
            </Text>
            <Text className="modal-content">{selectedDraft.description}</Text>
            <Divider my="sm" />
            <Text className="modal-content">{selectedDraft.content}</Text>
            <Group position="center" mt="md">
              <Button
                variant="filled"
                leftIcon={<Download size={16} />}
                onClick={() => alert("Download initiated!")}
              >
                Download Draft
              </Button>
            </Group>
          </Box>
        )}
      </Modal>
    </Box>
  );
}

export default SavedDraftsPage;