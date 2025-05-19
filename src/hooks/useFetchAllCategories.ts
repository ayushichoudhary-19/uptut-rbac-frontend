import { useState, useEffect } from "react";
import { useRBACContext } from "../context/RBACContext";

export type FeatureCategory = {
  _id: string;
  name: string;
};

export const useFetchAllCategories = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<FeatureCategory[]>([]);

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
      
        setCategories(data || []);
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
