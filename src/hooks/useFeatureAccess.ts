import { useSelector } from "react-redux";

export const useFeatureAccess = (featureId: string): boolean => {
  const featureIds = useSelector((state: any) => state.features.featureIds);
  return featureIds.includes(featureId);
};