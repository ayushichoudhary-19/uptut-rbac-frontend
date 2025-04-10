"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Paper, Stack } from "@mantine/core";

import { useFetchRoles } from "../hooks/useFetchRoles";
import { useFetchFeaturesByCategory } from "../hooks/useFetchFeaturesByCategory";
import { useAddFeaturesToRole } from "../hooks/useAddFeaturesToRole";
import { useFetchAllFeatures } from "../hooks/useFetchAllFeatures";
import { useFetchFeaturesByRole } from "../hooks/useFetchFeaturesByRole";
import { useFetchAllCategories } from "../hooks/useFetchAllCategories";
import { RoleSidebar } from "./RoleSidebar";
import { FeatureCategoryTabs } from "./FeatureCategoryTabs";
import { FeatureToggleTable } from "./FeatureToggleTable";
import { setFeatures } from "../store/featureSlice";

export const RBACRoleFeatureManager = () => {
  const { roles } = useFetchRoles();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { categories } = useFetchAllCategories();
  const { features: categoryFeatures = [] } =
    useFetchFeaturesByCategory(selectedCategory);
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
      await addFeatures(selectedRole, selectedFeatureIds); // Save selected features for the selected role
      alert("Permissions updated!"); // Success alert
    } catch (err) {
      console.error(err);
      alert("Failed to update permissions"); // Error alert
    }
  };

  // Once categories are fetched, if no category is selected, set the first one by default
  useEffect(() => {
    if (categories.length && !selectedCategory) {
      setSelectedCategory(categories[0]); // Set the first category as selected
    }
  }, [categories, selectedCategory]);

  return (
    <Paper className="p-6 flex gap-6" withBorder>
      {/* Sidebar for selecting roles */}
      <RoleSidebar
        roles={roles}
        selected={selectedRole}
        onSelect={setSelectedRole}
        onAdd={() => {}}
      />
      <Stack className="flex-1">
        {/* Category Tabs */}
        <FeatureCategoryTabs
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory} // Update the selected category
        />
        {/* Table to toggle features */}
        <FeatureToggleTable
          features={categoryFeatures} // List features based on category
          selectedIds={selectedFeatureIds}
          onToggle={toggleFeature}
          onSave={handleSave}
        />
      </Stack>
    </Paper>
  );
};
