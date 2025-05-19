import React, { createContext, useContext } from "react";
import { RBACConfig } from "../types/RBACConfig";

interface RBACContextValue {
  endpoints: Required<RBACConfig["endpoints"]>;
  requestHeaders?: () => HeadersInit;
}

const defaultEndpoints = {
  getRoles: () => "/api/roles",
  getFeatures: (roleId: string) => `/api/features/role/${roleId}`,
  getAllFeatures: () => "/api/features",
  getFeaturesByCategory: (categoryId: string) =>
    `/api/features/category/${categoryId}`,
  getAllCategories: () => "/api/feature-categories",
  createRole: "/api/roles",
  createFeature: "/api/features",
  uploadFeatureJson: "/api/features/bulk",
  addFeaturesToRole: "/api/roles/assign-features",
  removeFeaturesFromRole: "/api/roles/remove-features",
  removeRole: "/api/roles/delete",
};

const RBACContext = createContext<RBACContextValue | undefined>(undefined);

export const RBACProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: RBACConfig;
}) => {
  const mergedEndpoints = { ...defaultEndpoints, ...config.endpoints };

  return (
    <RBACContext.Provider
      value={{
        endpoints: mergedEndpoints,
        requestHeaders: config.requestHeaders,
      }}
    >
      {children}
    </RBACContext.Provider>
  );
};

export const useRBACContext = () => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error("useRBACContext must be used within an RBACProvider");
  }
  return context;
};
