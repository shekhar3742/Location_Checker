const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const SITE_LOCATION = {
  latitude: 28.62995209594908,
  longitude: 77.37719558188438,
};

const MAX_RADIUS = 20;

// Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;

  const toRad = (v) => (v * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

app.post("/checkin", (req, res) => {
  const { latitude, longitude, accuracy } = req.body;

  const distance = getDistance(
    SITE_LOCATION.latitude,
    SITE_LOCATION.longitude,
    latitude,
    longitude
  );

  if (accuracy <= 30 && distance <= MAX_RADIUS + accuracy) {
    return res.json({
      success: true,
      message: "✅ Check-in allowed",
      distance,
      
    });
  }

  return res.json({
    success: false,
    message: "❌ You are outside the 20m range",
    distance,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});