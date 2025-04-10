import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
import * as redux from 'redux';
import * as _reduxjs_toolkit from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import * as immer from 'immer';

declare const useFetchPermissions: (roleId: string) => void;

declare const useFeatureAccess: (featureId: string) => boolean;

interface RBACConfig {
    endpoints: {
        getFeatures: (roleId: string) => string;
        createRole?: string;
        createFeature?: string;
        uploadFeatureJson?: string;
    };
    requestHeaders?: () => HeadersInit;
}

declare const RBACProvider: ({ children, config, }: {
    children: React.ReactNode;
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

interface FeatureListProps {
    features: {
        id: string;
        name: string;
    }[];
    selected: string[];
    onToggle: (id: string) => void;
    primaryColor?: string;
}
declare const FeatureList: React.FC<FeatureListProps>;

interface RoleManagerProps {
    roles: string[];
    onAdd: (role: string) => void;
    primaryColor?: string;
}
declare const RoleManager: React.FC<RoleManagerProps>;

export { FeatureList, type RBACConfig, RBACProvider, RoleManager, _default as featureReducer, featureSlice, setFeatures, useFeatureAccess, useFetchPermissions, useRBACContext };
