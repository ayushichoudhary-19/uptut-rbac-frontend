import * as redux from 'redux';

declare const useFetchPermissions: (roleId: string) => void;

declare const useFeatureAccess: (featureId: string) => boolean;

interface FeatureState {
    featureIds: string[];
}
declare const _default: redux.Reducer<FeatureState>;

export { _default as featureReducer, useFeatureAccess, useFetchPermissions };
