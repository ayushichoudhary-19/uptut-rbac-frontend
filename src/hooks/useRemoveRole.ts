import { useRBACContext } from "../context/RBACContext";

export const useRemoveRole = () => {
  const { endpoints, requestHeaders } = useRBACContext();

  const removeRole = async (role: string) => {
    if (!endpoints.removeRole) {
      throw new Error("removeRole endpoint not defined");
    }

    const res = await fetch(endpoints.removeRole, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(requestHeaders?.() || {}),
      },
      body: JSON.stringify({ role }),
    });

    if (!res.ok) throw new Error("Failed to remove role");
    return await res.json();
  };

  return { removeRole };
};
