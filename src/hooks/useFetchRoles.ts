import { useEffect, useState } from "react";
import { useRBACContext } from "../context/RBACContext";

interface Role {
  id: string;
  name: string;
}

export const useFetchRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { endpoints, requestHeaders } = useRBACContext();

  const fetchRoles = async () => {
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
      setRoles(data.roles || []); // Expecting array of { id, name } objects
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [endpoints, requestHeaders]);

  return { roles, loading, error, refetchRoles: fetchRoles };
};
