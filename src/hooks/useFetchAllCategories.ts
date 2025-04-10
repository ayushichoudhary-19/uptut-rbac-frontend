import { useState, useEffect } from "react";
import { useRBACContext } from "../context/RBACContext";

export const useFetchAllCategories = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = endpoints.getAllCategories?.();
    if (!url) return;

    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: requestHeaders?.() || {},
        });
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [endpoints, requestHeaders]);

  return { categories, loading, error };
};
