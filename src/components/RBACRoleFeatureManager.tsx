"use client";

import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useDispatch } from "react-redux";
import { Paper, Stack } from "@mantine/core";
import { useFetchRoles } from "../hooks/useFetchRoles";
import { useFetchFeaturesByCategory } from "../hooks/useFetchFeaturesByCategory";
import { useAddFeaturesToRole } from "../hooks/useAddFeaturesToRole";
import { useFetchFeaturesByRole } from "../hooks/useFetchFeaturesByRole";
import { useFetchAllCategories } from "../hooks/useFetchAllCategories";
import { useAddRole } from "../hooks/useAddRole";
import { RoleSidebar } from "./RoleSidebar";
import { FeatureCategoryTabs } from "./FeatureCategoryTabs";
import { FeatureToggleTable } from "./FeatureToggleTable";
import { setFeatures } from "../store/featureSlice";
import { RoleManagement } from "./RoleManagement";

export const RBACRoleFeatureManager = memo(() => {
  const getNormalizedId = (item) => item?.id || item?._id;
  const { roles, refetchRoles } = useFetchRoles();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { categories } = useFetchAllCategories();
  const { addRole } = useAddRole();
  const { addFeatures } = useAddFeaturesToRole();
  const dispatch = useDispatch();

  const { features: categoryFeatures = [] } =
    useFetchFeaturesByCategory(selectedCategory);
  const { features: roleFeatures = [] } = useFetchFeaturesByRole(selectedRole);

  const roleFeaturesByCategoryIds = useMemo(() => {
    return roleFeatures
      .filter(feature => {
        const featureCategoryId = feature.categoryId || feature.category;
        return featureCategoryId === selectedCategory;
      })
      .map(feature => getNormalizedId(feature));
  }, [roleFeatures, selectedCategory]);

  useEffect(() => {
    if (selectedRole && selectedCategory) {
      setSelectedFeatureIds(roleFeaturesByCategoryIds);
    }
  }, [selectedRole, selectedCategory, roleFeaturesByCategoryIds]);
  
  // Add memoization for categoryFeatures
  const memoizedCategoryFeatures = useMemo(
    () => categoryFeatures,
    [categoryFeatures]
  );

  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>([]);
  const [isCreatingRole, setIsCreatingRole] = useState(false);

  useEffect(() => {
    if (roles.length > 0 && !selectedRole) {
      setSelectedRole(getNormalizedId(roles[0]));
    }
  }, [roles, selectedRole]);
  
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(getNormalizedId(categories[0]));
    }
  }, [categories, selectedCategory]);

  // Extract IDs from role features
  const roleFeatureIds = roleFeatures.map((f: any) => f.id);

  // Fix 1: Add proper dependency array and memoize roleFeatureIds
  const memoizedRoleFeatureIds = useMemo(
    () => roleFeatures.map((f: any) => f.id),
    [roleFeatures]
  );

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
      console.log("Toggling feature:", featureId, "Current state:", isSelected);
      return isSelected
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId];
    });
  }, []);

  const handleSave = useCallback(async () => {
    if (!selectedRole) return;
    
    try {
      // 1. Get all the role's current features
      const currentRoleFeatureIds = roleFeatureIds;
      
      // 2. Filter out features from the current category
      const featuresFromOtherCategories = roleFeatures
        .filter(feature => {
          const featureCategoryId = feature.categoryId || feature.category;
          return featureCategoryId !== selectedCategory;
        })
        .map(feature => getNormalizedId(feature));
      
      // 3. Combine with the newly selected features from current category
      const updatedFeatureIds = [
        ...featuresFromOtherCategories,
        ...selectedFeatureIds
      ];
      
      // 4. Save to backend
      await addFeatures(selectedRole, updatedFeatureIds);
      dispatch(setFeatures(updatedFeatureIds));
    } catch (error) {
      console.error("Failed to save features:", error);
    }
  }, [selectedRole, selectedCategory, selectedFeatureIds, roleFeatures, roleFeatureIds, addFeatures, dispatch]);
  const handleCreateRole = useCallback(
    async (roleId: string, roleName: string) => {
      try {
        await addRole({ id: roleId, name: roleName });
        setIsCreatingRole(false);
        await refetchRoles();
        setSelectedRole(roleId);
      } catch (error) {
        console.error("Failed to create role:", error);
      }
    },
    [addRole, refetchRoles]
  );

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
        {selectedCategory && (
          <>
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
          </>
        )}
      </Stack>
    </Paper>
  );
});

RBACRoleFeatureManager.displayName = "RBACRoleFeatureManager";
