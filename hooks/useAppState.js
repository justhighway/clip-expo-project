import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

const useAppState = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isComeback, setIsComeback] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        setIsComeback(true);
        console.log("App has come to the foreground!");
      }

      if (appState.current.match(/active/) && nextAppState === "background") {
        setIsComeback(false);
        console.log("App has come to the background!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return { appStateVisible, isComeback };
};

export { useAppState };
