import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFeatures } from "../store/featureSlice";
import { useRBACContext } from "../context/RBACContext";

export const useFetchFeaturesByRole = (roleId: string) => {
  const dispatch = useDispatch();
  const { endpoints, requestHeaders } = useRBACContext();

  useEffect(() => {
    if (!roleId) return;

    const fetchFeaturesByRole = async () => {
      const res = await fetch(endpoints.getFeatures(roleId), {
        headers: requestHeaders?.() || {},
      });
      const data = await res.json();
      const featureIds = data.map((feature: any) => feature.id);
      dispatch(setFeatures(featureIds));
    };

    fetchFeaturesByRole();
  }, [roleId, endpoints, requestHeaders]);
};
