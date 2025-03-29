import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Text, Box } from "@mantine/core";
import "../../style/Pcc_Admin/PCCAdminNotifications.css";

// Dummy data for notifications
const notificationsData = [
  {
    id: 1,
    title: "AI-Based Disease Detection in Crops",
    status: "Approved by director",
    type: "approval",
    description:
      "Application approved by Director and needs to be forwarded to Attorney.",
    date: "2024-10-25",
    time: "11:30:00",
  },
  {
    id: 2,
    title: "Smart Irrigation System",
    status: "Rejected by director",
    type: "rejection",
    description:
      "Application rejected by Director. Needs to be returned to applicant with comments.",
    date: "2024-10-24",
    time: "15:45:00",
  },
  {
    id: 3,
    title: "New Patent Application Received",
    status: "Pending review",
    type: "new",
    description:
      "New application received from applicant. Needs to be reviewed before forwarding to Director.",
    date: "2024-10-23",
    time: "09:15:00",
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
  type,
  onMarkAsRead,
  onForwardToAttorney,
  onReturnToApplicant,
}) {
  const getStatusColor = () => {
    switch (type) {
      case "approval":
        return "#38a169"; // green
      case "rejection":
        return "#e53e3e"; // red
      case "new":
        return "#3182ce"; // blue
      default:
        return "#718096"; // gray
    }
  };

  return (
    <Card
      className="notification-card"
      style={{ borderLeft: `6px solid ${getStatusColor()}` }}
    >
      <Text className="notification-title">{title}</Text>
      <Text className="notification-status" style={{ color: getStatusColor() }}>
        {status}
      </Text>
      <Text className="notification-date">{`${date} | ${time}`}</Text>
      <Text className="notification-description">{description}</Text>

      <div className="notification-actions">
        {type === "approval" && (
          <Button
            variant="outline"
            className="forward-button"
            onClick={() => onForwardToAttorney(id)}
          >
            Forward to Attorney
          </Button>
        )}

        {type === "rejection" && (
          <Button
            variant="outline"
            className="return-button"
            onClick={() => onReturnToApplicant(id)}
          >
            Return to Applicant
          </Button>
        )}

        <Button
          variant="outline"
          className="mark-read-button"
          onClick={() => onMarkAsRead(id)}
        >
          Mark as Read
        </Button>
      </div>
    </Card>
  );
}

NotificationCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onMarkAsRead: PropTypes.func.isRequired,
  onForwardToAttorney: PropTypes.func,
  onReturnToApplicant: PropTypes.func,
};

function PCCAdminNotifications() {
  const [notifications, setNotifications] = useState(notificationsData);

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  const handleForwardToAttorney = (id) => {
    // In a real app, this would trigger an API call
    alert(`Application ${id} forwarded to Attorney`);
    handleMarkAsRead(id);
  };

  const handleReturnToApplicant = (id) => {
    // In a real app, this would trigger an API call
    alert(`Application ${id} returned to Applicant`);
    handleMarkAsRead(id);
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
            type={notification.type}
            onMarkAsRead={handleMarkAsRead}
            onForwardToAttorney={handleForwardToAttorney}
            onReturnToApplicant={handleReturnToApplicant}
          />
        ))}
      </Box>
    </Box>
  );
}

export default PCCAdminNotifications;
