import { useState, useEffect } from "react";
import { useRBACContext } from "../context/RBACContext";

export const useFetchFeaturesByCategory = (category: string) => {
  const { endpoints, requestHeaders } = useRBACContext();
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category || !endpoints.getFeaturesByCategory) return;

    const loadFeatures = async () => {
      setLoading(true);
      try {
        const res = await fetch(endpoints.getFeaturesByCategory(category), {
          headers: requestHeaders?.() || {},
        });
        const data = await res.json();
        setFeatures(data.features || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFeatures();
  }, [category, endpoints, requestHeaders]);

  return { features, loading, error };
};
