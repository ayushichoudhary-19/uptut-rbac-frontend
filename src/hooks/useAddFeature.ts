import { useRBACContext } from "../context/RBACContext";

export const useAddFeature = () => {
  const { endpoints, requestHeaders } = useRBACContext();

  const addFeature = async (role: string, feature: { id: string; name: string; category?: string }) => {
    if (!endpoints.createFeature) throw new Error("createFeature endpoint not defined");

    const res = await fetch(endpoints.createFeature, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(requestHeaders?.() || {}),
      },
      body: JSON.stringify({ role, feature }),
    });

    if (!res.ok) throw new Error("Failed to add feature");
    return await res.json();
  };

  return { addFeature };
};