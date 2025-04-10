// src/types/RBACConfig.ts

export interface RBACConfig {
    endpoints: {
      getFeatures: (roleId: string) => string;
      getRoles: () => string;
      getFeaturesByCategory?: (category: string) => string;
      getAllFeatures?: () => string;
      addFeaturesToRole?: string;
      removeFeaturesFromRole?: string;
      removeRole?: string;
      createRole?: string;
      createFeature?: string;
      uploadFeatureJson?: string;
    };
    requestHeaders?: () => HeadersInit;
  }
  