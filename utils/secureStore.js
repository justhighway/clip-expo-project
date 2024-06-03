import * as SecureStore from "expo-secure-store";

const setSecureStore = async (key, data) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error setting secure store", error);
  }
};

const getSecureStore = async (key) => {
  try {
    const storedData = await SecureStore.getItemAsync(key);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Error getting secure store", error);
    return null;
  }
};

const removeSecureStore = async (key) => {
  try {
    const data = getSecureStore(key);
    if (data) {
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.error("Error removing secure store", error);
  }
};

export { setSecureStore, getSecureStore, removeSecureStore };
