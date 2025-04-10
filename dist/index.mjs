var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/hooks/useFetchFeaturesByRole.ts
import { useEffect, useState } from "react";

// src/context/RBACContext.tsx
import { createContext, useContext } from "react";
import { jsx } from "react/jsx-runtime";
var RBACContext = createContext(void 0);
var RBACProvider = ({
  children,
  config
}) => {
  return /* @__PURE__ */ jsx(RBACContext.Provider, { value: config, children });
};
var useRBACContext = () => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error("useRBACContext must be used within an RBACProvider");
  }
  return context;
};

// src/hooks/useFetchFeaturesByRole.ts
var useFetchFeaturesByRole = (roleId) => {
  const [features, setFeatures2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { endpoints, requestHeaders } = useRBACContext();
  useEffect(() => {
    if (!roleId) return;
    const fetchFeaturesByRole = () => __async(void 0, null, function* () {
      setLoading(true);
      try {
        const res = yield fetch(endpoints.getFeatures(roleId), {
          headers: (requestHeaders == null ? void 0 : requestHeaders()) || {}
        });
        const data = yield res.json();
        setFeatures2(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });
    fetchFeaturesByRole();
  }, [roleId, endpoints, requestHeaders]);
  return { features, loading, error };
};

// src/hooks/useFeatureAccess.ts
import { useSelector } from "react-redux";
var useFeatureAccess = (featureId) => {
  const featureIds = useSelector((state) => {
    var _a, _b;
    return (_b = (_a = state.features) == null ? void 0 : _a.featureIds) != null ? _b : [];
  });
  return featureIds.includes(featureId);
};

// src/hooks/useAddRole.ts
var useAddRole = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const addRole = (_0) => __async(void 0, [_0], function* ({ id, name }) {
    if (!endpoints.createRole) throw new Error("createRole endpoint not defined");
    const res = yield fetch(endpoints.createRole, {
      method: "POST",
      headers: __spreadValues({
        "Content-Type": "application/json"
      }, (requestHeaders == null ? void 0 : requestHeaders()) || {}),
      body: JSON.stringify({ id, name })
    });
    if (!res.ok) throw new Error("Failed to add role");
    return yield res.json();
  });
  return { addRole };
};

// src/hooks/useFetchRoles.ts
import { useCallback, useEffect as useEffect2, useMemo, useState as useState2 } from "react";
var useFetchRoles = () => {
  const [roles, setRoles] = useState2([]);
  const [loading, setLoading] = useState2(false);
  const [error, setError] = useState2("");
  const { endpoints, requestHeaders } = useRBACContext();
  const fetchRoles = useCallback(() => __async(void 0, null, function* () {
    if (!endpoints.getRoles) {
      setError("getRoles endpoint not defined");
      return;
    }
    setLoading(true);
    try {
      const res = yield fetch(endpoints.getRoles(), {
        headers: (requestHeaders == null ? void 0 : requestHeaders()) || {}
      });
      if (!res.ok) throw new Error("Failed to fetch roles");
      const data = yield res.json();
      setRoles(data.roles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }), [endpoints, requestHeaders]);
  useEffect2(() => {
    fetchRoles();
  }, [fetchRoles]);
  return useMemo(() => ({
    roles,
    loading,
    error,
    refetchRoles: fetchRoles
  }), [roles, loading, error, fetchRoles]);
};

// src/hooks/useAddFeature.ts
var useAddFeature = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const addFeature = (role, feature) => __async(void 0, null, function* () {
    if (!endpoints.createFeature) throw new Error("createFeature endpoint not defined");
    const res = yield fetch(endpoints.createFeature, {
      method: "POST",
      headers: __spreadValues({
        "Content-Type": "application/json"
      }, (requestHeaders == null ? void 0 : requestHeaders()) || {}),
      body: JSON.stringify({ role, feature })
    });
    if (!res.ok) throw new Error("Failed to add feature");
    return yield res.json();
  });
  return { addFeature };
};

// src/hooks/useUploadFeatureJson.ts
var useUploadFeatureJson = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const uploadFeatures = (features) => __async(void 0, null, function* () {
    if (!endpoints.uploadFeatureJson) throw new Error("uploadFeatureJson endpoint not defined");
    const res = yield fetch(endpoints.uploadFeatureJson, {
      method: "POST",
      headers: __spreadValues({
        "Content-Type": "application/json"
      }, (requestHeaders == null ? void 0 : requestHeaders()) || {}),
      body: JSON.stringify({ features })
    });
    if (!res.ok) throw new Error("Failed to upload feature list");
    return yield res.json();
  });
  return { uploadFeatures };
};

// src/hooks/useRemoveFeaturesFromRole.ts
var useRemoveFeaturesFromRole = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const removeFeaturesFromRole = (role, featureIds) => __async(void 0, null, function* () {
    if (!endpoints.removeFeaturesFromRole) {
      throw new Error("removeFeaturesFromRole endpoint not defined");
    }
    const res = yield fetch(endpoints.removeFeaturesFromRole, {
      method: "DELETE",
      headers: __spreadValues({
        "Content-Type": "application/json"
      }, (requestHeaders == null ? void 0 : requestHeaders()) || {}),
      body: JSON.stringify({ role, featureIds })
    });
    if (!res.ok) throw new Error("Failed to remove features");
    return yield res.json();
  });
  return { removeFeaturesFromRole };
};

// src/hooks/useRemoveRole.ts
var useRemoveRole = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const removeRole = (role) => __async(void 0, null, function* () {
    if (!endpoints.removeRole) {
      throw new Error("removeRole endpoint not defined");
    }
    const res = yield fetch(endpoints.removeRole, {
      method: "DELETE",
      headers: __spreadValues({
        "Content-Type": "application/json"
      }, (requestHeaders == null ? void 0 : requestHeaders()) || {}),
      body: JSON.stringify({ role })
    });
    if (!res.ok) throw new Error("Failed to remove role");
    return yield res.json();
  });
  return { removeRole };
};

// src/hooks/useAddFeaturesToRole.ts
var useAddFeaturesToRole = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const addFeaturesToRole = (role, featureIds) => __async(void 0, null, function* () {
    if (!endpoints.addFeaturesToRole) {
      throw new Error("addFeaturesToRole endpoint not defined");
    }
    const res = yield fetch(endpoints.addFeaturesToRole, {
      method: "POST",
      headers: __spreadValues({
        "Content-Type": "application/json"
      }, (requestHeaders == null ? void 0 : requestHeaders()) || {}),
      body: JSON.stringify({ role, featureIds })
    });
    if (!res.ok) throw new Error("Failed to add features");
    return yield res.json();
  });
  return { addFeatures: addFeaturesToRole };
};

// src/components/FeatureUploader.tsx
import { useState as useState3 } from "react";
import { Dropzone } from "@mantine/dropzone";
import { Text, Group } from "@mantine/core";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var FeatureUploader = ({ onUpload }) => {
  const [error, setError] = useState3(null);
  const handleDrop = (files) => __async(void 0, null, function* () {
    const file = files[0];
    if (!file) return;
    try {
      const text = yield file.text();
      const data = JSON.parse(text);
      if (Array.isArray(data)) {
        const ids = data.map((f) => f.id || f);
        onUpload(ids);
      } else {
        setError("Invalid JSON format");
      }
    } catch (e) {
      setError("Failed to parse JSON file");
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx2(Dropzone, { onDrop: handleDrop, children: /* @__PURE__ */ jsx2(Group, { justify: "center", mih: 100, children: /* @__PURE__ */ jsx2(Text, { size: "sm", children: "Drop or click to upload feature JSON" }) }) }),
    error && /* @__PURE__ */ jsx2(Text, { c: "red", children: error })
  ] });
};

// src/components/RBACSummary.tsx
import { Card, Text as Text2, Stack, Badge } from "@mantine/core";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var RBACSummary = ({ role, featureIds }) => {
  return /* @__PURE__ */ jsx3(Card, { shadow: "sm", radius: "md", withBorder: true, p: "lg", children: /* @__PURE__ */ jsxs2(Stack, { children: [
    /* @__PURE__ */ jsxs2(Text2, { fw: 700, size: "lg", children: [
      "Role: ",
      role
    ] }),
    /* @__PURE__ */ jsx3(Text2, { fw: 500, children: "Assigned Features:" }),
    /* @__PURE__ */ jsx3(Stack, { gap: 4, children: featureIds.length > 0 ? featureIds.map((id) => /* @__PURE__ */ jsx3(Badge, { children: id }, id)) : /* @__PURE__ */ jsx3(Text2, { size: "sm", c: "dimmed", children: "No features assigned" }) })
  ] }) });
};

// src/components/RBACRoleFeatureManager.tsx
import { useState as useState7, useEffect as useEffect5, useMemo as useMemo3, useCallback as useCallback3, memo as memo3 } from "react";
import { useDispatch } from "react-redux";
import { Paper as Paper3, Stack as Stack4 } from "@mantine/core";

// src/hooks/useFetchFeaturesByCategory.ts
import { useState as useState4, useEffect as useEffect3, useCallback as useCallback2, useMemo as useMemo2 } from "react";
var useFetchFeaturesByCategory = (category) => {
  const [features, setFeatures2] = useState4([]);
  const [loading, setLoading] = useState4(false);
  const [error, setError] = useState4(null);
  const { endpoints, requestHeaders } = useRBACContext();
  const fetchFeatures = useCallback2(() => __async(void 0, null, function* () {
    if (!category) return;
    setLoading(true);
    try {
      const res = yield fetch(endpoints.getFeaturesByCategory(category), {
        headers: (requestHeaders == null ? void 0 : requestHeaders()) || {}
      });
      const data = yield res.json();
      setFeatures2(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }), [category, endpoints, requestHeaders]);
  useEffect3(() => {
    if (category) {
      fetchFeatures();
    }
  }, [category, fetchFeatures]);
  return useMemo2(() => ({
    features,
    loading,
    error
  }), [features, loading, error]);
};

// src/hooks/useFetchAllCategories.ts
import { useState as useState5, useEffect as useEffect4 } from "react";
var useFetchAllCategories = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const [categories, setCategories] = useState5([]);
  const [loading, setLoading] = useState5(false);
  const [error, setError] = useState5(null);
  useEffect4(() => {
    var _a;
    const url = (_a = endpoints.getAllCategories) == null ? void 0 : _a.call(endpoints);
    if (!url) return;
    const fetchCategories = () => __async(void 0, null, function* () {
      setLoading(true);
      try {
        const res = yield fetch(url, {
          headers: (requestHeaders == null ? void 0 : requestHeaders()) || {}
        });
        const data = yield res.json();
        setCategories(data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    });
    fetchCategories();
  }, [endpoints, requestHeaders]);
  return { categories, loading, error };
};

// src/components/RoleSidebar.tsx
import { Button as Button2, Stack as Stack2 } from "@mantine/core";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var RoleSidebar = ({
  roles,
  selected,
  onSelect,
  onAdd
}) => {
  return /* @__PURE__ */ jsxs3(Stack2, { className: "w-64", children: [
    /* @__PURE__ */ jsx4(Button2, { onClick: onAdd, children: "+ Add Role" }),
    /* @__PURE__ */ jsx4(Stack2, { gap: "xs", children: roles.map((role) => /* @__PURE__ */ jsx4(
      Button2,
      {
        variant: selected === role.id ? "filled" : "subtle",
        onClick: () => onSelect(role.id),
        children: role.name
      },
      role.id
    )) })
  ] });
};

// src/components/FeatureCategoryTabs.tsx
import { memo } from "react";
import { Tabs } from "@mantine/core";
import { jsx as jsx5 } from "react/jsx-runtime";
var FeatureCategoryTabs = memo(({
  categories,
  selected,
  onSelect
}) => {
  return /* @__PURE__ */ jsx5(Tabs, { value: selected, onChange: onSelect, variant: "outline", children: /* @__PURE__ */ jsx5(Tabs.List, { children: categories.map((cat) => /* @__PURE__ */ jsx5(Tabs.Tab, { value: cat, children: cat }, cat)) }) });
});
FeatureCategoryTabs.displayName = "FeatureCategoryTabs";

// src/components/FeatureToggleTable.tsx
import { memo as memo2 } from "react";
import { Checkbox, Table, Button as Button3 } from "@mantine/core";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var FeatureToggleTable = memo2(({
  features,
  selectedIds,
  onToggle,
  onSave
}) => {
  return /* @__PURE__ */ jsxs4("div", { children: [
    /* @__PURE__ */ jsxs4(Table, { striped: true, highlightOnHover: true, children: [
      /* @__PURE__ */ jsx6("thead", { children: /* @__PURE__ */ jsxs4("tr", { children: [
        /* @__PURE__ */ jsx6("th", { children: "Select" }),
        /* @__PURE__ */ jsx6("th", { children: "Feature Name" })
      ] }) }),
      /* @__PURE__ */ jsx6("tbody", { children: features.map((feature) => /* @__PURE__ */ jsxs4("tr", { children: [
        /* @__PURE__ */ jsx6("td", { children: /* @__PURE__ */ jsx6(
          Checkbox,
          {
            checked: selectedIds.includes(feature.id),
            onChange: () => onToggle(feature.id)
          }
        ) }),
        /* @__PURE__ */ jsx6("td", { children: feature.name })
      ] }, feature.id)) })
    ] }),
    /* @__PURE__ */ jsx6(Button3, { mt: "md", onClick: onSave, children: "Save Changes" })
  ] });
});
FeatureToggleTable.displayName = "FeatureToggleTable";

// src/store/featureSlice.ts
import { createSlice } from "@reduxjs/toolkit";
var initialState = {
  featureIds: []
};
var featureSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    setFeatures: (state, action) => {
      state.featureIds = action.payload;
    }
  }
});
var { setFeatures } = featureSlice.actions;
var featureSlice_default = featureSlice.reducer;

// src/components/RoleManagement.tsx
import { useState as useState6 } from "react";
import { TextInput, Button as Button4, Paper as Paper2, Stack as Stack3 } from "@mantine/core";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var RoleManagement = ({ onRoleCreate, onCancel }) => {
  const [roleName, setRoleName] = useState6("");
  const [roleId, setRoleId] = useState6("");
  const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/(^_|_$)/g, "");
  };
  const handleNameChange = (value) => {
    setRoleName(value);
    setRoleId(generateSlug(value));
  };
  const handleSubmit = () => {
    if (roleName && roleId) {
      onRoleCreate(roleId, roleName);
    }
  };
  return /* @__PURE__ */ jsx7(Paper2, { p: "xl", shadow: "sm", children: /* @__PURE__ */ jsxs5(Stack3, { gap: "md", children: [
    /* @__PURE__ */ jsx7(
      TextInput,
      {
        label: "Role Name",
        value: roleName,
        onChange: (e) => handleNameChange(e.target.value),
        placeholder: "e.g. System Administrator",
        required: true
      }
    ),
    /* @__PURE__ */ jsx7(
      TextInput,
      {
        label: "Role ID",
        value: roleId,
        onChange: (e) => setRoleId(e.target.value),
        placeholder: "system_administrator",
        description: "Auto-generated from name, but can be modified"
      }
    ),
    /* @__PURE__ */ jsxs5("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsx7(Button4, { onClick: handleSubmit, children: "Create Role" }),
      /* @__PURE__ */ jsx7(Button4, { variant: "subtle", onClick: onCancel, children: "Cancel" })
    ] })
  ] }) });
};

// src/components/RBACRoleFeatureManager.tsx
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
var RBACRoleFeatureManager = memo3(() => {
  const { roles, refetchRoles } = useFetchRoles();
  const [selectedRole, setSelectedRole] = useState7("");
  const [selectedCategory, setSelectedCategory] = useState7("");
  const { categories } = useFetchAllCategories();
  const { addRole } = useAddRole();
  const { addFeatures } = useAddFeaturesToRole();
  const dispatch = useDispatch();
  const { features: categoryFeatures = [] } = useFetchFeaturesByCategory(selectedCategory);
  const { features: roleFeatures = [] } = useFetchFeaturesByRole(selectedRole);
  const memoizedCategoryFeatures = useMemo3(() => categoryFeatures, [categoryFeatures]);
  const [selectedFeatureIds, setSelectedFeatureIds] = useState7([]);
  const [isCreatingRole, setIsCreatingRole] = useState7(false);
  const roleFeatureIds = roleFeatures.map((f) => f.id);
  const memoizedRoleFeatureIds = useMemo3(() => roleFeatures.map((f) => f.id), [roleFeatures]);
  useEffect5(() => {
    if (selectedRole) {
      setSelectedFeatureIds(memoizedRoleFeatureIds);
    }
  }, [selectedRole, memoizedRoleFeatureIds]);
  const toggleFeature = useCallback3((featureId) => {
    setSelectedFeatureIds((prev) => {
      const isSelected = prev.includes(featureId);
      console.log("Toggling feature:", featureId, "Current state:", isSelected);
      return isSelected ? prev.filter((id) => id !== featureId) : [...prev, featureId];
    });
  }, []);
  const handleSave = useCallback3(() => __async(void 0, null, function* () {
    if (!selectedRole) return;
    try {
      yield addFeatures(selectedRole, selectedFeatureIds);
      dispatch(setFeatures(selectedFeatureIds));
    } catch (error) {
      console.error("Failed to save features:", error);
    }
  }), [selectedRole, selectedFeatureIds, addFeatures, dispatch]);
  const handleCreateRole = useCallback3((roleId, roleName) => __async(void 0, null, function* () {
    try {
      yield addRole({ id: roleId, name: roleName });
      setIsCreatingRole(false);
      yield refetchRoles();
      setSelectedRole(roleId);
    } catch (error) {
      console.error("Failed to create role:", error);
    }
  }), [addRole, refetchRoles]);
  const handleCategorySelect = useCallback3((category) => {
    setSelectedCategory(category);
  }, []);
  const handleRoleSelect = useCallback3((role) => {
    setSelectedRole(role);
  }, []);
  if (isCreatingRole) {
    return /* @__PURE__ */ jsx8(
      RoleManagement,
      {
        onRoleCreate: handleCreateRole,
        onCancel: () => setIsCreatingRole(false)
      }
    );
  }
  return /* @__PURE__ */ jsxs6(Paper3, { className: "p-6 flex gap-6", withBorder: true, children: [
    /* @__PURE__ */ jsx8(
      RoleSidebar,
      {
        roles,
        selected: selectedRole,
        onSelect: handleRoleSelect,
        onAdd: () => setIsCreatingRole(true)
      }
    ),
    /* @__PURE__ */ jsxs6(Stack4, { className: "flex-1", children: [
      /* @__PURE__ */ jsx8(
        FeatureCategoryTabs,
        {
          categories,
          selected: selectedCategory,
          onSelect: handleCategorySelect
        }
      ),
      /* @__PURE__ */ jsx8(
        FeatureToggleTable,
        {
          features: memoizedCategoryFeatures,
          selectedIds: selectedFeatureIds,
          onToggle: toggleFeature,
          onSave: handleSave
        }
      )
    ] })
  ] });
});
RBACRoleFeatureManager.displayName = "RBACRoleFeatureManager";

// src/store/allFeaturesSlice.ts
import { createSlice as createSlice2 } from "@reduxjs/toolkit";
var initialState2 = {
  allFeatures: []
};
var allFeaturesSlice = createSlice2({
  name: "allFeatures",
  initialState: initialState2,
  reducers: {
    setAllFeatures: (state, action) => {
      state.allFeatures = action.payload;
    }
  }
});
var { setAllFeatures } = allFeaturesSlice.actions;
var allFeaturesSlice_default = allFeaturesSlice.reducer;
export {
  FeatureUploader,
  RBACProvider,
  RBACRoleFeatureManager,
  RBACSummary,
  allFeaturesSlice,
  featureSlice_default as featureReducer,
  featureSlice,
  setAllFeatures,
  setFeatures,
  useAddFeature,
  useAddFeaturesToRole,
  useAddRole,
  useFeatureAccess,
  useFetchFeaturesByRole,
  useFetchRoles,
  useRBACContext,
  useRemoveFeaturesFromRole,
  useRemoveRole,
  useUploadFeatureJson
};
