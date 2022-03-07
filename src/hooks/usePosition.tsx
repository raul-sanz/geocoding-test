import {useState, useEffect} from 'react';
import { Coordinates, Position, PositionError } from '../types/usePosition';

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
};

export function usePosition(){
  const settings = {
    ...defaultSettings,
  };

  const [position, setPosition] = useState <Coordinates| {}>({});
  const [error, setError] = useState <string|null> (null);
  const [timestamp, setTimestamp] = useState <number|null> (null);

  const onChange = ({coords,timestamp}:Position) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      speed: coords.speed,
      heading: coords.heading
    });
    setTimestamp(timestamp)
  };

  const onError = (error:PositionError) => {
    setError(error.message);
  };

 
    const getPosition = ()=>{
      if (!navigator || !navigator.geolocation) {
        setError('Geolocation is not supported');
        return;
      }
  
  
      navigator.geolocation.getCurrentPosition(onChange, onError, settings);
    }


  return {...position,timestamp, error,getPosition};
};