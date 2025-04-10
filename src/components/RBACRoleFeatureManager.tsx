"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Paper, Stack } from "@mantine/core";
import { useFetchRoles } from "../hooks/useFetchRoles";
import { useFetchFeaturesByCategory } from "../hooks/useFetchFeaturesByCategory";
import { useAddFeaturesToRole } from "../hooks/useAddFeaturesToRole";
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

  const { features: categoryFeatures = [] } = useFetchFeaturesByCategory(selectedCategory);

  // Add these console logs
  console.log("Selected Category:", selectedCategory);
  console.log("Category Features:", categoryFeatures);

  const { features:roleFeatures } = useFetchFeaturesByRole(selectedRole);
  const roleFeatureIds = roleFeatures.map((f: any) => f.id);

  const { addFeatures } = useAddFeaturesToRole();
  
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>(roleFeatureIds);

  const toggleFeature = (id: string) => {
    const updated = selectedFeatureIds.includes(id)
      ? selectedFeatureIds.filter((f) => f !== id)
      : [...selectedFeatureIds, id];
    setSelectedFeatureIds(updated);
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
          selectedIds={selectedFeatureIds} // Use the selected features for the selected role
          onToggle={toggleFeature}
          onSave={handleSave}
        />
      </Stack>
    </Paper>
  );
};
