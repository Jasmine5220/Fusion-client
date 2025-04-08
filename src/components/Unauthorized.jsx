import React from "react";
import { Container, Text, Button, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ShieldWarning } from "@phosphor-icons/react";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Container size="sm" style={{ textAlign: "center", paddingTop: "100px" }}>
      <ShieldWarning size={64} color="red" />
      <Title order={1} mt="md">
        Unauthorized Access
      </Title>
      <Text size="lg" mt="md" color="dimmed">
        You don't have permission to access this page.
      </Text>
      <Button
        variant="filled"
        color="blue"
        mt="xl"
        onClick={() => navigate("/")}
      >
        Return to Home
      </Button>
    </Container>
  );
}

export default Unauthorized;
