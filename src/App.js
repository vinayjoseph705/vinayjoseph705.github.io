import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [startPosition, setStartPosition] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [speed, setSpeed] = useState(0);

  // Calculate the distance between two points
  const calculateDistance = (start, end) => {
    if (!start || !end) return 0;
    const { latitude: lat1, longitude: lon1 } = start;
    const { latitude: lat2, longitude: lon2 } = end;
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Calculate speed in meters per second (m/s)
  const calculateSpeed = (distance, timeInSeconds) => {
    if (!distance || !timeInSeconds) return 0;
    return distance / timeInSeconds;
  };

  // Update position and speed when the device moves
  const handleMove = (event) => {
    const { coords, timestamp } = event;
    setCurrentPosition(coords);

    if (startPosition) {
      const distance = calculateDistance(startPosition, coords);
      const timeInSeconds = (timestamp - startPosition.timestamp) / 1000;
      const newSpeed = calculateSpeed(distance, timeInSeconds);
      setSpeed(newSpeed);
    }
  };

  // Request geolocation on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(handleMove, console.error, {
        enableHighAccuracy: true,
        maximumAge: 0,
      });
    } else {
      alert("Geolocation is not supported by your device.");
    }
  }, []);

  // Set initial position on geolocation found
  useEffect(() => {
    if (currentPosition) {
      setStartPosition({ ...currentPosition, timestamp: Date.now() });
    }
  }, [currentPosition]);

  return (
    <div className="App">
      <h1>Speedometer PWA</h1>
      {speed > 0 && <p>Current speed: {speed} m/s</p>}
    </div>
  );
}

export default App;
