// src/hooks/useFetchAllFeatures.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllFeatures } from "../store/allFeaturesSlice";
import { useRBACContext } from "../context/RBACContext";

export const useFetchAllFeatures = () => {
  const dispatch = useDispatch();
  const { endpoints, requestHeaders } = useRBACContext();

  useEffect(() => {
    const fetchAll = async () => {
      if (!endpoints.getAllFeatures) return;

      const res = await fetch(endpoints.getAllFeatures(), {
        headers: requestHeaders?.() || {},
      });
      const data = await res.json();

      dispatch(setAllFeatures(data));
    };

    fetchAll();
  }, [endpoints, requestHeaders]);
};
