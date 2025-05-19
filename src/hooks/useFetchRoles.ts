import { useCallback, useEffect, useMemo, useState } from "react";
import { useRBACContext } from "../context/RBACContext";

interface Role {
  id: string;
  name: string;
}

export const useFetchRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { endpoints, requestHeaders } = useRBACContext();

  const fetchRoles = useCallback(async () => {
    if (!endpoints.getRoles) {
      setError("getRoles endpoint not defined");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(endpoints.getRoles(), {
        headers: requestHeaders?.() || {},
      });
      if (!res.ok) throw new Error("Failed to fetch roles");
      const data = await res.json();
      setRoles(
        (data || []).map((r: any) => ({
          id: r.id || r._id,
          name: r.name,
        }))
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoints, requestHeaders]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return useMemo(
    () => ({
      roles,
      loading,
      error,
      refetchRoles: fetchRoles,
    }),
    [roles, loading, error, fetchRoles]
  );
};
