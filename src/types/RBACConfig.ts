export interface RBACConfig {
  endpoints: {
    getFeatures: (roleId: string) => string;
    getRoles: () => string;
    addFeaturesToRole?: string;
    removeFeaturesFromRole?: string;
    removeRole?: string;
    createRole?: string;
    createFeature?: string;
    uploadFeatureJson?: string;
  };
  requestHeaders?: () => HeadersInit;
}
