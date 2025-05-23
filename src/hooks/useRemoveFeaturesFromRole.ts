import { useRBACContext } from "../context/RBACContext";

export const useRemoveFeaturesFromRole = () => {
  const { endpoints, requestHeaders } = useRBACContext();

  const removeFeaturesFromRole = async (role: string, featureIds: string[]) => {
    if (!endpoints.removeFeaturesFromRole) {
      throw new Error("removeFeaturesFromRole endpoint not defined");
    }

    const res = await fetch(endpoints.removeFeaturesFromRole, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(requestHeaders?.() || {}),
      },
      body: JSON.stringify({ role, featureIds }),
    });

    if (!res.ok) throw new Error("Failed to remove features");
    return await res.json();
  };

  return { removeFeaturesFromRole };
};
