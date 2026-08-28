import { useState } from "react";

export default function App() {
  const [permission, setPermission] = useState(Notification.permission);

  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
  };

  const sendNotification = () => {
    if (Notification.permission !== "granted") {
      alert("Please enable notifications first.");
      return;
    }

    new Notification("🎉 Hello!", {
      body: "This is a test notification from React.",
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Browser Notification Demo</h1>

      <p>Permission: {permission}</p>

      <button onClick={enableNotifications}>
        Enable Notifications
      </button>

      <br />
      <br />

      <button onClick={sendNotification}>
        Send Notification
      </button>
    </div>
  );
}