import { useState } from "react";

function CheckIn() {
  const [message, setMessage] = useState("");

  const handleCheckIn = () => {
    setMessage("Getting location...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude, accuracy } = pos.coords;

          const response = await fetch(
            "https://location-checker-1.onrender.com/checkin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                latitude,
                longitude,
                accuracy,
              }),
            }
          );

          const data = await response.json();

          setMessage(
            `${data.message} | Distance: ${data.distance.toFixed(2)} m`
          );
        } catch (error) {
          setMessage("Server error");
        }
      },
      (error) => {
        setMessage("Location permission denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Worker Check-In</h2>

      <button onClick={handleCheckIn}>
        Check In
      </button>

      <p>{message}</p>
    </div>
  );
}

export default CheckIn;