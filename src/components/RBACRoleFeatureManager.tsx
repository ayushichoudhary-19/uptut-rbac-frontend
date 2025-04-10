"use client";

import { useState } from "react";
import {
  FeatureCategoryTabs,
} from "./FeatureCategoryTabs";
import { FeatureToggleTable } from "./FeatureToggleTable";
import { RoleSidebar } from "./RoleSidebar";

import { Paper, Stack } from "@mantine/core";

import { useFetchRoles } from "../hooks/useFetchRoles";
import { useFetchFeaturesByCategory } from "../hooks/useFetchFeaturesByCategory";
import { useAddFeaturesToRole } from "../hooks/useAddFeaturesToRole";

const DUMMY_CATEGORIES = ["dashboard", "campaigns", "labs", "meetings"];

interface RBACRoleFeatureManagerProps {
  initialSelectedFeatureIds: string[];
}

export const RBACRoleFeatureManager = ({
  initialSelectedFeatureIds,
}: RBACRoleFeatureManagerProps) => {
  const { roles } = useFetchRoles();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("dashboard");
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>(initialSelectedFeatureIds);

  const { features: categoryFeatures = [] } = useFetchFeaturesByCategory(selectedCategory);
  const { addFeatures } = useAddFeaturesToRole();

  const toggleFeature = (id: string) => {
    setSelectedFeatureIds((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
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
