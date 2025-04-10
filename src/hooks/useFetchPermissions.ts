import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFeatures } from "../store/featureSlice";
import { useRBACContext } from "../context/RBACContext";

export const useFetchPermissions = (roleId: string) => {
  const dispatch = useDispatch();
  const { getFeatureUrl } = useRBACContext();

  useEffect(() => {
    if (!roleId) return;

    const fetchFeatures = async () => {
      const res = await fetch(getFeatureUrl(roleId));
      const data = await res.json();
      dispatch(setFeatures(data));
    };

    fetchFeatures();
  }, [roleId, getFeatureUrl]);
};
