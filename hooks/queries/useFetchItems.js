import { useState, useEffect } from "react";
import { getUserItems, getItems } from "@/api/items";

const useFetchUserItems = () => {
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const result = await getUserItems();
        setUserItems(result.result.data.itemDTOList);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserItems();
  }, []);

  return { userItems, loading, error };
};

const useFetchItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await getItems();
        setItems(result.result.data.itemDTOList);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, loading, error };
};

export { useFetchUserItems, useFetchItems };
