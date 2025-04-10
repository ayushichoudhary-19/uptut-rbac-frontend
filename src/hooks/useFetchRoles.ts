import { useEffect, useState } from "react";
import { useRBACContext } from "../context/RBACContext";

export const useFetchRoles = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!endpoints.getRoles) {
        setError("getRoles endpoint not defined");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(endpoints.getRoles(), {
          headers: {
            ...(requestHeaders?.() || {}),
          },
        });

        if (!res.ok) throw new Error("Failed to fetch roles");
        const data = await res.json();
        setRoles(data.roles || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [endpoints, requestHeaders]);

  return { roles, loading, error };
};
