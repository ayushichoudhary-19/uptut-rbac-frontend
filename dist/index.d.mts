import React$1 from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as redux from 'redux';
import * as _reduxjs_toolkit from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import * as immer from 'immer';

declare const useFetchFeaturesByRole: (roleId: string) => {
    features: any[];
    loading: boolean;
    error: string;
};

declare const useFeatureAccess: (featureId: string) => boolean;

declare const useAddRole: () => {
    addRole: (role: string) => Promise<any>;
};

declare const useFetchRoles: () => {
    roles: string[];
    loading: boolean;
    error: string;
};

declare const useAddFeature: () => {
    addFeature: (role: string, feature: {
        id: string;
        name: string;
        category?: string;
    }) => Promise<any>;
};

declare const useUploadFeatureJson: () => {
    uploadFeatures: (features: Array<{
        id: string;
        name: string;
        category?: string;
    }>) => Promise<any>;
};

declare const useRemoveFeaturesFromRole: () => {
    removeFeaturesFromRole: (role: string, featureIds: string[]) => Promise<any>;
};

declare const useRemoveRole: () => {
    removeRole: (role: string) => Promise<any>;
};

declare const useAddFeaturesToRole: () => {
    addFeatures: (role: string, featureIds: string[]) => Promise<any>;
};

interface RoleManagerProps {
    roles: string[];
    onAdd: (role: string) => void;
    primaryColor?: string;
}
declare const RoleManager: React$1.FC<RoleManagerProps>;

interface FeatureUploaderProps {
    onUpload: (featureIds: string[]) => void;
}
declare const FeatureUploader: React$1.FC<FeatureUploaderProps>;

interface RBACSummaryProps {
    role: string;
    featureIds: string[];
}
declare const RBACSummary: React.FC<RBACSummaryProps>;

declare const RBACRoleFeatureManager: () => react_jsx_runtime.JSX.Element;

interface RBACConfig {
    endpoints: {
        getFeatures: (roleId: string) => string;
        getRoles: () => string;
        getAllFeatures?: () => string;
        getFeaturesByCategory?: (category: string) => string;
        getAllCategories?: () => string;
        addFeaturesToRole?: string;
        removeFeaturesFromRole?: string;
        removeRole?: string;
        createRole?: string;
        createFeature?: string;
        uploadFeatureJson?: string;
    };
    requestHeaders?: () => HeadersInit;
}

declare const RBACProvider: ({ children, config, }: {
    children: React$1.ReactNode;
    config: RBACConfig;
}) => react_jsx_runtime.JSX.Element;
declare const useRBACContext: () => RBACConfig;

interface FeatureState {
    featureIds: string[];
}
declare const featureSlice: _reduxjs_toolkit.Slice<FeatureState, {
    setFeatures: (state: immer.WritableDraft<FeatureState>, action: PayloadAction<string[]>) => void;
}, "features", "features", _reduxjs_toolkit.SliceSelectors<FeatureState>>;
declare const setFeatures: _reduxjs_toolkit.ActionCreatorWithOptionalPayload<string[], "features/setFeatures">;
declare const _default: redux.Reducer<FeatureState>;

interface AllFeaturesState {
    allFeatures: {
        id: string;
        name: string;
        category?: string;
    }[];
}
declare const allFeaturesSlice: _reduxjs_toolkit.Slice<AllFeaturesState, {
    setAllFeatures: (state: immer.WritableDraft<AllFeaturesState>, action: PayloadAction<AllFeaturesState["allFeatures"]>) => void;
}, "allFeatures", "allFeatures", _reduxjs_toolkit.SliceSelectors<AllFeaturesState>>;
declare const setAllFeatures: _reduxjs_toolkit.ActionCreatorWithOptionalPayload<{
    id: string;
    name: string;
    category?: string;
}[], "allFeatures/setAllFeatures">;

export { type AllFeaturesState, type FeatureState, FeatureUploader, type RBACConfig, RBACProvider, RBACRoleFeatureManager, RBACSummary, RoleManager, allFeaturesSlice, _default as featureReducer, featureSlice, setAllFeatures, setFeatures, useAddFeature, useAddFeaturesToRole, useAddRole, useFeatureAccess, useFetchFeaturesByRole, useFetchRoles, useRBACContext, useRemoveFeaturesFromRole, useRemoveRole, useUploadFeatureJson };
