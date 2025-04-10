"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Paper, Stack } from "@mantine/core";

import { useFetchRoles } from "../hooks/useFetchRoles";
import { useFetchFeaturesByCategory } from "../hooks/useFetchFeaturesByCategory";
import { useAddFeaturesToRole } from "../hooks/useAddFeaturesToRole";
import { useFetchAllFeatures } from "../hooks/useFetchAllFeatures";
import { useFetchFeaturesByRole } from "../hooks/useFetchFeaturesByRole";

import { RoleSidebar } from "./RoleSidebar";
import { FeatureCategoryTabs } from "./FeatureCategoryTabs";
import { FeatureToggleTable } from "./FeatureToggleTable";
import { setFeatures } from "../store/featureSlice";

const DUMMY_CATEGORIES = ["dashboard", "campaigns", "labs", "meetings"];

export const RBACRoleFeatureManager = () => {
  const { roles } = useFetchRoles();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("dashboard");

  const { features: categoryFeatures = [] } = useFetchFeaturesByCategory(selectedCategory);
  const { addFeatures } = useAddFeaturesToRole();
  useFetchAllFeatures();
  useFetchFeaturesByRole(selectedRole);
  const dispatch = useDispatch();

  const selectedFeatureIds = useSelector(
    (state: RootState) => state.features.featureIds
  );

  const toggleFeature = (id: string) => {
    const updated = selectedFeatureIds.includes(id)
      ? selectedFeatureIds.filter((f) => f !== id)
      : [...selectedFeatureIds, id];
      dispatch(setFeatures(updated));
  };

  const handleSave = async () => {
    try {
      await addFeatures(selectedRole, selectedFeatureIds);
      alert("Permissions updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update permissions");
    }
  };

  return (
    <Paper className="p-6 flex gap-6" withBorder>
      <RoleSidebar
        roles={roles}
        selected={selectedRole}
        onSelect={setSelectedRole}
        onAdd={() => {}}
      />
      <Stack className="flex-1">
        <FeatureCategoryTabs
          categories={DUMMY_CATEGORIES}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <FeatureToggleTable
          features={categoryFeatures}
          selectedIds={selectedFeatureIds}
          onToggle={toggleFeature}
          onSave={handleSave}
        />
      </Stack>
    </Paper>
  );
};
