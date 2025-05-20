import React, { createContext, useContext } from "react";
import type { RBACConfig } from "../types/RBACConfig";

interface RBACContextValue {
  endpoints: {
    getRoles: () => string;
    getFeatures: (roleId: string) => string;
    getAllFeatures?: () => string;
    getFeaturesByCategory?: (categoryId: string) => string;
    getAllCategories?: () => string;
    createRole?: () => string;
    createFeature?: () => string;
    uploadFeatureJson?: () => string;
    addFeaturesToRole?: (roleId: string) => string;
    removeFeaturesFromRole?: () => string;
    removeRole?: () => string;
  };
  requestHeaders?: () => HeadersInit;
}

const RBACContext = createContext<RBACContextValue | undefined>(undefined);

export const RBACProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: RBACConfig;
}) => {
  const baseUrl = config.baseUrl ?? "";

  const defaultEndpoints = {
    getRoles: () => `${baseUrl}/api/roles`,
    getFeatures: (roleId: string) => `${baseUrl}/api/roles/${roleId}/features`,
    getAllFeatures: () => `${baseUrl}/api/features`,
    getFeaturesByCategory: (categoryId: string) => `${baseUrl}/api/features/category/${categoryId}`,
    getAllCategories: () => `${baseUrl}/api/feature-categories`,
    createRole: () => `${baseUrl}/api/roles`,
    createFeature: () => `${baseUrl}/api/features`,
    uploadFeatureJson: () => `${baseUrl}/api/features/bulk`,
    addFeaturesToRole: (roleId: string) => `${baseUrl}/api/roles/${roleId}/features`,
    removeFeaturesFromRole: () => `${baseUrl}/api/roles/remove-features`,
    removeRole: () => `${baseUrl}/api/roles/delete`,
  };

  const mergedEndpoints = {
    ...defaultEndpoints,
    ...config.endpoints,
  };

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
