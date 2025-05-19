export interface RBACConfig {
  baseUrl?: string;
  endpoints: Partial<{
    getFeatures: (roleId: string) => string;
    getRoles: () => string;
    getAllFeatures: () => string;
    getFeaturesByCategory: (categoryId: string) => string;
    getAllCategories: () => string;
    addFeaturesToRole: string;
    removeFeaturesFromRole: string;
    removeRole: string;
    createRole: string;
    createFeature: string;
    uploadFeatureJson: string;
  }>;
  requestHeaders?: () => HeadersInit;
}
