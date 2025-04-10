import { useRBACContext } from "../context/RBACContext";

export const useUploadFeatureJson = () => {
  const { endpoints, requestHeaders } = useRBACContext();

  const uploadFeatures = async (features: Array<{ id: string; name: string; category?: string }>) => {
    if (!endpoints.uploadFeatureJson) throw new Error("uploadFeatureJson endpoint not defined");

    const res = await fetch(endpoints.uploadFeatureJson, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(requestHeaders?.() || {}),
      },
      body: JSON.stringify({ features }),
    });

    if (!res.ok) throw new Error("Failed to upload feature list");
    return await res.json();
  };

  return { uploadFeatures };
};