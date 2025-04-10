"use client";

import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useDispatch } from "react-redux";
import { Paper, Stack } from "@mantine/core";
import { useFetchRoles } from "../hooks/useFetchRoles";
import { useFetchFeaturesByCategory } from "../hooks/useFetchFeaturesByCategory";
import { useAddFeaturesToRole } from "../hooks/useAddFeaturesToRole";
import { useFetchFeaturesByRole } from "../hooks/useFetchFeaturesByRole";
import { useFetchAllCategories } from "../hooks/useFetchAllCategories";
import { useAddRole } from "../hooks/useAddRole"; // Add this import
import { RoleSidebar } from "./RoleSidebar";
import { FeatureCategoryTabs } from "./FeatureCategoryTabs";
import { FeatureToggleTable } from "./FeatureToggleTable";
import { setFeatures } from "../store/featureSlice";
import { RoleManagement } from "./RoleManagement";

export const RBACRoleFeatureManager = memo(() => {
  const { roles, refetchRoles } = useFetchRoles();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { categories } = useFetchAllCategories();
  const { addRole } = useAddRole();
  const { addFeatures } = useAddFeaturesToRole();
  const dispatch = useDispatch();

  const { features: categoryFeatures = [] } = useFetchFeaturesByCategory(selectedCategory);
  const { features: roleFeatures = [] } = useFetchFeaturesByRole(selectedRole);

  // Add memoization for categoryFeatures
  const memoizedCategoryFeatures = useMemo(() => categoryFeatures, [categoryFeatures]);

  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>([]);
  const [isCreatingRole, setIsCreatingRole] = useState(false);

  // Extract IDs from role features
  const roleFeatureIds = roleFeatures.map((f: any) => f.id);

  // Fix 1: Add proper dependency array and memoize roleFeatureIds
  const memoizedRoleFeatureIds = useMemo(() => roleFeatures.map((f: any) => f.id), [roleFeatures]);

  // Fix 2: Update useEffect to use memoized value and proper dependencies
  useEffect(() => {
    if (selectedRole) {
      setSelectedFeatureIds(memoizedRoleFeatureIds);
    }
  }, [selectedRole, memoizedRoleFeatureIds]);

  // Fix 3: Memoize handlers
  const toggleFeature = useCallback((featureId: string) => {
    setSelectedFeatureIds((prev) => {
      const isSelected = prev.includes(featureId);
      console.log('Toggling feature:', featureId, 'Current state:', isSelected);
      return isSelected 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId];
    });
  }, []);

  const handleSave = useCallback(async () => {
    if (!selectedRole) return;
    try {
      await addFeatures(selectedRole, selectedFeatureIds);
      dispatch(setFeatures(selectedFeatureIds));
    } catch (error) {
      console.error('Failed to save features:', error);
    }
  }, [selectedRole, selectedFeatureIds, addFeatures, dispatch]);

  const handleCreateRole = useCallback(async (roleId: string, roleName: string) => {
    try {
      await addRole({ id: roleId, name: roleName });
      setIsCreatingRole(false);
      await refetchRoles();
      setSelectedRole(roleId);
    } catch (error) {
      console.error('Failed to create role:', error);
    }
  }, [addRole, refetchRoles]);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleRoleSelect = useCallback((role: string) => {
    setSelectedRole(role);
  }, []);

  if (isCreatingRole) {
    return (
      <RoleManagement
        onRoleCreate={handleCreateRole}
        onCancel={() => setIsCreatingRole(false)}
      />
    );
  }

  return (
    <Paper className="p-6 flex gap-6" withBorder>
      <RoleSidebar
        roles={roles}
        selected={selectedRole}
        onSelect={handleRoleSelect}
        onAdd={() => setIsCreatingRole(true)}
      />
      <Stack className="flex-1">
        <FeatureCategoryTabs
          categories={categories}
          selected={selectedCategory}
          onSelect={handleCategorySelect}
        />
        <FeatureToggleTable
          features={memoizedCategoryFeatures}
          selectedIds={selectedFeatureIds}
          onToggle={toggleFeature}
          onSave={handleSave}
        />
      </Stack>
    </Paper>
  );
});

RBACRoleFeatureManager.displayName = 'RBACRoleFeatureManager';
