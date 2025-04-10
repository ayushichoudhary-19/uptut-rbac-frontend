import { useRBACContext } from "../context/RBACContext";

export const useAddRole = () => {
  const { endpoints, requestHeaders } = useRBACContext();

  const addRole = async ({ id, name }: { id: string; name: string }) => {
    if (!endpoints.createRole) throw new Error("createRole endpoint not defined");

    const res = await fetch(endpoints.createRole, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(requestHeaders?.() || {}),
      },
      body: JSON.stringify({ id, name }),
    });

    if (!res.ok) throw new Error("Failed to add role");
    return await res.json();
  };

  return { addRole };
};