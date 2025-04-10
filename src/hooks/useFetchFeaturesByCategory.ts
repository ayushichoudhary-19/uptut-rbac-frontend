import { useState, useEffect, useCallback, useMemo } from "react";
import { useRBACContext } from "../context/RBACContext";

export const useFetchFeaturesByCategory = (category: string) => {
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { endpoints, requestHeaders } = useRBACContext();

  const fetchFeatures = useCallback(async () => {
    if (!category) return;
    
    setLoading(true);
    try {
      const res = await fetch(endpoints.getFeaturesByCategory(category), {
        headers: requestHeaders?.() || {},
      });
      const data = await res.json();
      setFeatures(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, endpoints, requestHeaders]);

  useEffect(() => {
    if (category) {
      fetchFeatures();
    }
  }, [category, fetchFeatures]);

  return useMemo(() => ({ 
    features, 
    loading, 
    error 
  }), [features, loading, error]);
};
