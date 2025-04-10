import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFeatures } from "../store/featureSlice"

export const useFetchPermissions = (roleId: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!roleId) return;

    const fetchFeatures = async () => {
      const res = await fetch(`/api/features?role=\${roleId}`);
      const data = await res.json();
      dispatch(setFeatures(data));
    };

    fetchFeatures();
  }, [roleId]);
};