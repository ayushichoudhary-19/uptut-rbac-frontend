import { useEffect, useState } from "react";
import { useRBACContext } from "../context/RBACContext";

export const useFetchFeaturesByRole = (roleId: string) => {
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { endpoints, requestHeaders } = useRBACContext();

  useEffect(() => {
    if (!roleId) return;

    const fetchFeaturesByRole = async () => {
      setLoading(true);
      try {
        const res = await fetch(endpoints.getFeatures(roleId), {
          headers: requestHeaders?.() || {},
        });
        const data = await res.json();
        setFeatures(data || []); // Directly set the fetched features
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturesByRole();
  }, [roleId, endpoints, requestHeaders]);

  return { features, loading, error };
};
