import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Text, Box, Divider } from "@mantine/core";
import { Check } from "phosphor-react";
import "../../../style/Applicant/ApplicantNotifications.css";

// Dummy data for notifications
const notificationsData = [
  {
    id: 1,
    title: "AI-Based Disease Detection in Crops",
    status: "Approved by director",
    description:
      "Application approved by Director and sent to Attorney for Patentability check.",
    date: "2024-10-23",
    time: "14:30:00",
    color: "#4CAF50",
  },
  {
    id: 2,
    title: "AI-Based Disease Detection in Crops",
    status: "Sent to director by PCC_Admin",
    description:
      "Application accepted by PCC Admin and forwarded to Director for initial review.",
    date: "2024-10-22",
    time: "10:15:30",
    color: "#2196F3",
  },
  {
    id: 3,
    title: "AI-Based Disease Detection in Crops",
    status: "Submitted to PCC Admin",
    description:
      "Application forwarded to PCC Admin for approval by Director and sent to Attorney for Patentability check.",
    date: "2024-10-21",
    time: "09:45:00",
    color: "#FFC107",
  },
];

// Notification card component
function NotificationCard({
  id,
  title,
  status,
  description,
  date,
  time,
  color,
  onMarkAsRead,
}) {
  return (
    <Card className="notification-card" style={{ borderLeft: `6px solid ${color}` }}>
      <Text className="card-title" weight={600} size="lg">
        {title}
      </Text>
      <Text className="card-status" style={{ color }}>
        {status}
      </Text>
      <Text className="card-details" size="sm" color="dimmed">
        {date} | {time}
      </Text>
      <Divider my="sm" />
      <Text className="card-description" size="sm">
        {description}
      </Text>
      <Button
        variant="light"
        leftIcon={<Check size={16} />}
        className="markReadButton"
        onClick={() => onMarkAsRead(id)}
        fullWidth
        mt="sm"
      >
        Mark as Read
      </Button>
    </Card>
  );
}

// PropTypes validation for NotificationCard
NotificationCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onMarkAsRead: PropTypes.func.isRequired,
};

// Main NotificationsPage component
function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData);

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <Box style={{ padding: "16px" }}>
      {/* Header */}
      <Text className="notif-header-text" size="xl" weight={700}>
        Notifications
      </Text>

      {/* Notifications container */}
      <Box className="notif-container">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            id={notification.id}
            title={notification.title}
            status={notification.status}
            description={notification.description}
            date={notification.date}
            time={notification.time}
            color={notification.color}
            onMarkAsRead={handleMarkAsRead}
          />
        ))}
      </Box>
    </Box>
  );
}

export default NotificationsPage;