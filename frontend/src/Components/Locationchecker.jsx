import { useState } from "react";

function CheckIn() {
  const [message, setMessage] = useState("");

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos.coords),
        (err) => reject(err),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    });
  };

  const handleCheckIn = async () => {
    try {
      setMessage("Getting location...");

      
      const loc1 = await getLocation();

      
      await new Promise((r) => setTimeout(r, 2000));

      
      const loc2 = await getLocation();

     
      const latitude = (loc1.latitude + loc2.latitude) / 2;
      const longitude = (loc1.longitude + loc2.longitude) / 2;
      const accuracy = Math.min(loc1.accuracy, loc2.accuracy);

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
      console.error(error);
      setMessage("Location permission denied or error getting location");
    }
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