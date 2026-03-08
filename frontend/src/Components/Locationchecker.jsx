import { useState } from "react";

function CheckIn() {
  const [message, setMessage] = useState("");

  const handleCheckIn = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        const response = await fetch("https://location-checker-1.onrender.com/checkin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude,
            longitude,
            accuracy,
          }),
        });

        const data = await response.json();
        setMessage(data.message);
      },
      (error) => {
        console.error(error);
        setMessage("Location permission denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Worker Check-In</h2>

      <button onClick={handleCheckIn}>Check In</button>

      <p>{message}</p>
    </div>
  );
}

export default CheckIn;