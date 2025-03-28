import React from "react";
import {
  MantineProvider,
  Grid,
  Card,
  Text,
  Button,
  Group,
  Stack,
  Title,
  Container,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

function AttorneyDetails() {
  const applications = [
    {
      id: 1,
      topic: "Prototype for a mini rocket engine",
      field: "Mechanical Engineering",
      date: "2023-10-03",
    },
    {
      id: 2,
      topic: "Prototype for a mini rocket engine",
      field: "Mechanical Engineering",
      date: "2023-10-03",
    },
    {
      id: 3,
      topic: "Prototype for a mini rocket engine",
      field: "Mechanical Engineering",
      date: "2023-10-03",
    },
    {
      id: 4,
      topic: "Prototype for a mini rocket engine",
      field: "Mechanical Engineering",
      date: "2023-10-03",
    },
    {
      id: 5,
      topic: "Prototype for a mini rocket engine",
      field: "Mechanical Engineering",
      date: "2023-10-03",
    },
    {
      id: 6,
      topic: "Prototype for a mini rocket engine",
      field: "Mechanical Engineering",
      date: "2023-10-03",
    },
  ];

  if (applications.length === 0) {
    return <Text>No applications available.</Text>;
  }

  return (
    <Container size="lg">
      <Title order={2} mb="md">
        View Attorney Assign
      </Title>
      <Grid>
        {applications.map((app) => (
          <Grid.Col key={app.id} span={{ base: 12, md: 6 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group position="apart" mb="xs">
                <Text fw={500}>Attorney assigned for Application {app.id}</Text>
                <IconTrash size="1rem" style={{ cursor: "pointer" }} />
              </Group>
              <Stack spacing="xs">
                <Text size="sm" c="dimmed">
                  Date: {app.date}
                </Text>
                <Text size="sm">Topic: {app.topic}</Text>
                <Text size="sm">Field: {app.field}</Text>
              </Stack>
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Assigned
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AttorneyDetails />
    </MantineProvider>
  );
}
