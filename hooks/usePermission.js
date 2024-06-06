// hooks/usePermission.js
import { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";

const usePermission = () => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  return hasPermission;
};

export { usePermission };
