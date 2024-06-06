import { useEffect, useState } from "react";
import * as Location from "expo-location";
import useAppState from "./useAppState";

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: 37.5665,
    longitude: 126.978,
  });
  const [isUserLocationError, setUserLocationError] = useState(false);
  const { isComeback } = useAppState();

  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setUserLocationError(true);
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });
      setUserLocationError(false);
    };

    getLocationAsync();
  }, [isComeback]);

  return { userLocation, isUserLocationError };
};

export { useUserLocation };
