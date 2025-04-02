import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Text, Box } from "@mantine/core";
import "../../style/Director/DirectorNotifications.css"; // Import the CSS file
import notificationsData from "../../data/director/notificationsData"; // Import the notifications data

// Notification card component
function NotificationCard({
  id,
  token,
  title,
  status,
  description,
  date,
  time,
  color,
  onMarkAsRead,
  isRead,
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
      <Text className="notification-token">{token}</Text>
      <Text className="notification-date">{`${date} | ${time}`}</Text>
      <Text className="notification-description">{description}</Text>
      <Button
        variant={isRead ? "default" : "outline"}
        className={`mark-read-button ${isRead ? "highlight" : ""}`}
        onClick={() => onMarkAsRead(id)}
      >
        {isRead ? "Remove Notification" : "Mark as Read"}
      </Button>
    </Card>
  );
}

// PropTypes validation for NotificationCard
NotificationCard.propTypes = {
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onMarkAsRead: PropTypes.func.isRequired,
  isRead: PropTypes.bool.isRequired,
};

// Main DirectorNotifications component
function DirectorNotifications() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [readNotifications, setReadNotifications] = useState([]);

  const handleMarkAsRead = (id) => {
    if (readNotifications.includes(id)) {
      // Permanently remove the notification if already read
      setNotifications(
        notifications.filter((notification) => notification.id !== id),
      );
      setReadNotifications(readNotifications.filter((readId) => readId !== id));
    } else {
      // Mark as read but do not remove
      setReadNotifications([...readNotifications, id]);
    }
  };

  // // Add a new notification dynamically for demo purposes
  // const handleAddNotification = () => {
  //   const newNotification = {
  //     id: notifications.length + 1,
  //     title: "New Patent Application - Advanced Robotics",
  //     status: "Pending",
  //     description:
  //       "A new patent application has been submitted for review.",
  //     date: new Date().toISOString().split("T")[0],
  //     time: new Date().toLocaleTimeString(),
  //     color: "blue",
  //   };

  //   setNotifications([newNotification, ...notifications]);
  // };

  return (
    <Box style={{ width: "95%" }}>
      {/* Page Title */}
      <Text className="notif-title">Notifications</Text>

      {/* Add New Notification Button
      <Button
        className="add-notification-button"
        onClick={handleAddNotification}
        mt="md"
      >
        Add New Notification
      </Button> */}

      {/* Notifications container */}
      <Box className="notifications-container">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            token={notification.token}
            id={notification.id}
            title={notification.title}
            status={notification.status}
            description={notification.description}
            date={notification.date}
            time={notification.time}
            color={notification.color}
            onMarkAsRead={handleMarkAsRead}
            isRead={readNotifications.includes(notification.id)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default DirectorNotifications;
