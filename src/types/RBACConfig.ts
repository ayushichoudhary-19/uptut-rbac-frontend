export interface RBACConfig {
  baseUrl?: string;
  endpoints: Partial<{
    getRoles: () => string;
    getFeatures: (roleId: string) => string;
    getAllFeatures: () => string;
    getFeaturesByCategory: (categoryId: string) => string;
    getAllCategories: () => string;
    createRole: () => string;
    createFeature: () => string;
    uploadFeatureJson: () => string;
    addFeaturesToRole: (roleId: string) => string;
    removeFeaturesFromRole: () => string;
    removeRole: () => string;
  }>;
  requestHeaders?: () => HeadersInit;
}
