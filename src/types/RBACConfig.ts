export interface RBACConfig {
  endpoints: {
    getFeatures: (roleId: string) => string;
    createRole?: string;
    createFeature?: string;
    uploadFeatureJson?: string;
  };
  requestHeaders?: () => HeadersInit;
}
