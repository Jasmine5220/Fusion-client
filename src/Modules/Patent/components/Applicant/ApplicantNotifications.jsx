import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Text, Box } from "@mantine/core";
import "../../style/Applicant/ApplicantNotifications.css";

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
  },
  {
    id: 2,
    title: "AI-Based Disease Detection in Crops",
    status: "Sent to director by PCC_Admin",
    description:
      "Application accepted by PCC Admin and forwarded to Director for initial review.",
    date: "2024-10-22",
    time: "10:15:30",
  },
  {
    id: 3,
    title: "AI-Based Disease Detection in Crops",
    status: "Submitted to PCC Admin",
    description:
      "Application forwarded to PCC Admin for approval by Director and sent to Attorney for Patentability check.",
    date: "2024-10-21",
    time: "09:45:00",
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
    <Card
      className="notification-card"
      style={{ borderLeft: `6px solid ${color}` }}
    >
      <Text className="notification-title">{title}</Text>
      <Text className="notification-status" style={{ color }}>
        {status}
      </Text>
      <Text className="notification-date">{`${date} | ${time}`}</Text>
      <Text className="notification-description">{description}</Text>
      <Button
        variant="outline"
        className="markReadButton"
        onClick={() => onMarkAsRead(id)}
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
      notifications.filter((notification) => notification.id !== id),
    );
  };

  return (
    <Box>
      {/* Page Title */}
      <Text className="notif-title">Notifications</Text>

      {/* Notifications container */}
      <Box className="notification-container">
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
