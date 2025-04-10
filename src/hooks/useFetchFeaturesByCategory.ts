import { useState, useEffect } from "react";
import { useRBACContext } from "../context/RBACContext";

export const useFetchFeaturesByCategory = (category: string) => {
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { endpoints, requestHeaders } = useRBACContext();

  useEffect(() => {
    if (!category) return;
    
    const fetchFeatures = async () => {
      setLoading(true);
      try {
        const res = await fetch(endpoints.getFeaturesByCategory(category), {
          headers: requestHeaders?.() || {},
        });
        const data = await res.json();
               setFeatures(data || []);
        console.log('Fetched features:', data); // Debug log
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching features:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, [category, endpoints, requestHeaders]); // Make sure all dependencies are listed

  return { features, loading, error };
};
