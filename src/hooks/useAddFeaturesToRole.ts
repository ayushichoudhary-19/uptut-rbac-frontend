import { useRBACContext } from "../context/RBACContext";

export const useBulkAddFeatures = () => {
  const { endpoints, requestHeaders } = useRBACContext();

  const addFeaturesToRole = async (role: string, featureIds: string[]) => {
    if (!endpoints.addFeaturesToRole) {
      throw new Error("bulkAddFeatures endpoint not defined");
    }

    const res = await fetch(endpoints.addFeaturesToRole, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(requestHeaders?.() || {}),
      },
      body: JSON.stringify({ role, featureIds }),
    });

    if (!res.ok) throw new Error("Failed to add features");
    return await res.json();
  };

  return { addFeaturesToRole };
};
