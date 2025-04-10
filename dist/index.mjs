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
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const { endpoints, requestHeaders } = useRBACContext();
  useEffect(() => {
    if (!roleId) return;
    const fetchFeaturesByRole = () => __async(void 0, null, function* () {
      const res = yield fetch(endpoints.getFeatures(roleId), {
        headers: (requestHeaders == null ? void 0 : requestHeaders()) || {}
      });
      const data = yield res.json();
      const featureIds = data.map((feature) => feature.id);
      dispatch(setFeatures(featureIds));
    });
    fetchFeaturesByRole();
  }, [roleId, endpoints, requestHeaders]);
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
  const addRole = (role) => __async(void 0, null, function* () {
    if (!endpoints.createRole) throw new Error("createRole endpoint not defined");
    const res = yield fetch(endpoints.createRole, {
      method: "POST",
      headers: __spreadValues({
        "Content-Type": "application/json"
      }, (requestHeaders == null ? void 0 : requestHeaders()) || {}),
      body: JSON.stringify({ role })
    });
    if (!res.ok) throw new Error("Failed to add role");
    return yield res.json();
  });
  return { addRole };
};

// src/hooks/useFetchRoles.ts
import { useEffect as useEffect2, useState } from "react";
var useFetchRoles = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect2(() => {
    const fetchRoles = () => __async(void 0, null, function* () {
      if (!endpoints.getRoles) {
        setError("getRoles endpoint not defined");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = yield fetch(endpoints.getRoles(), {
          headers: __spreadValues({}, (requestHeaders == null ? void 0 : requestHeaders()) || {})
        });
        if (!res.ok) throw new Error("Failed to fetch roles");
        const data = yield res.json();
        setRoles(data.roles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });
    fetchRoles();
  }, [endpoints, requestHeaders]);
  return { roles, loading, error };
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

// src/components/FeatureList.tsx
import { Checkbox, Stack, Text, Paper } from "@mantine/core";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var FeatureList = ({
  features,
  selected,
  onToggle,
  primaryColor = "blue"
}) => {
  return /* @__PURE__ */ jsx2(Paper, { shadow: "xs", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Stack, { children: [
    /* @__PURE__ */ jsx2(Text, { fw: 600, mb: "sm", children: "Select Features" }),
    features.map((feature) => /* @__PURE__ */ jsx2(
      Checkbox,
      {
        label: feature.name,
        checked: selected.includes(feature.id),
        onChange: () => onToggle(feature.id),
        color: primaryColor
      },
      feature.id
    ))
  ] }) });
};

// src/components/RoleManager.tsx
import { useState as useState2 } from "react";
import { Button, Input, Text as Text2, Paper as Paper2, Stack as Stack2 } from "@mantine/core";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var RoleManager = ({ roles, onAdd, primaryColor = "blue" }) => {
  const [newRole, setNewRole] = useState2("");
  const { addRole } = useAddRole();
  const handleAdd = () => __async(void 0, null, function* () {
    if (!newRole) return;
    try {
      yield addRole(newRole);
      onAdd(newRole);
      setNewRole("");
    } catch (e) {
      console.error(e);
    }
  });
  return /* @__PURE__ */ jsx3(Paper2, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs2(Stack2, { children: [
    /* @__PURE__ */ jsx3(
      Input,
      {
        value: newRole,
        onChange: (e) => setNewRole(e.currentTarget.value),
        placeholder: "Enter new role"
      }
    ),
    /* @__PURE__ */ jsx3(Button, { color: primaryColor, onClick: handleAdd, children: "Add Role" }),
    /* @__PURE__ */ jsx3(Text2, { fw: 600, children: "Existing Roles:" }),
    roles.map((role) => /* @__PURE__ */ jsx3(Text2, { size: "sm", c: "dimmed", children: role }, role))
  ] }) });
};

// src/components/RoleSelector.tsx
import { Select } from "@mantine/core";
import { jsx as jsx4 } from "react/jsx-runtime";
var RoleSelector = ({
  roles,
  selected,
  onChange,
  label = "Select Role"
}) => {
  return /* @__PURE__ */ jsx4(
    Select,
    {
      label,
      value: selected,
      onChange,
      data: roles.map((role) => ({ value: role, label: role })),
      placeholder: "Pick a role",
      clearable: true,
      searchable: true
    }
  );
};

// src/components/FeatureUploader.tsx
import { useState as useState3 } from "react";
import { Dropzone } from "@mantine/dropzone";
import { Text as Text3, Group } from "@mantine/core";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs3("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx5(Dropzone, { onDrop: handleDrop, children: /* @__PURE__ */ jsx5(Group, { justify: "center", mih: 100, children: /* @__PURE__ */ jsx5(Text3, { size: "sm", children: "Drop or click to upload feature JSON" }) }) }),
    error && /* @__PURE__ */ jsx5(Text3, { c: "red", children: error })
  ] });
};

// src/components/RBACSummary.tsx
import { Card, Text as Text4, Stack as Stack3, Badge } from "@mantine/core";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var RBACSummary = ({ role, featureIds }) => {
  return /* @__PURE__ */ jsx6(Card, { shadow: "sm", radius: "md", withBorder: true, p: "lg", children: /* @__PURE__ */ jsxs4(Stack3, { children: [
    /* @__PURE__ */ jsxs4(Text4, { fw: 700, size: "lg", children: [
      "Role: ",
      role
    ] }),
    /* @__PURE__ */ jsx6(Text4, { fw: 500, children: "Assigned Features:" }),
    /* @__PURE__ */ jsx6(Stack3, { gap: 4, children: featureIds.length > 0 ? featureIds.map((id) => /* @__PURE__ */ jsx6(Badge, { children: id }, id)) : /* @__PURE__ */ jsx6(Text4, { size: "sm", c: "dimmed", children: "No features assigned" }) })
  ] }) });
};

// src/components/RBACRoleFeatureManager.tsx
import { useState as useState6 } from "react";
import { useDispatch as useDispatch3, useSelector as useSelector2 } from "react-redux";
import { Paper as Paper4, Stack as Stack5 } from "@mantine/core";

// src/hooks/useFetchFeaturesByCategory.ts
import { useState as useState4, useEffect as useEffect3 } from "react";
var useFetchFeaturesByCategory = (category) => {
  const { endpoints, requestHeaders } = useRBACContext();
  const [features, setFeatures2] = useState4([]);
  const [loading, setLoading] = useState4(false);
  const [error, setError] = useState4(null);
  useEffect3(() => {
    if (!category || !endpoints.getFeaturesByCategory) return;
    const loadFeatures = () => __async(void 0, null, function* () {
      setLoading(true);
      try {
        const res = yield fetch(endpoints.getFeaturesByCategory(category), {
          headers: (requestHeaders == null ? void 0 : requestHeaders()) || {}
        });
        const data = yield res.json();
        setFeatures2(data.features || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });
    loadFeatures();
  }, [category, endpoints, requestHeaders]);
  return { features, loading, error };
};

// src/hooks/useFetchAllFeatures.ts
import { useEffect as useEffect4 } from "react";
import { useDispatch as useDispatch2 } from "react-redux";

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

// src/hooks/useFetchAllFeatures.ts
var useFetchAllFeatures = () => {
  const dispatch = useDispatch2();
  const { endpoints, requestHeaders } = useRBACContext();
  useEffect4(() => {
    const fetchAll = () => __async(void 0, null, function* () {
      if (!endpoints.getAllFeatures) return;
      const res = yield fetch(endpoints.getAllFeatures(), {
        headers: (requestHeaders == null ? void 0 : requestHeaders()) || {}
      });
      const data = yield res.json();
      dispatch(setAllFeatures(data));
    });
    fetchAll();
  }, [endpoints, requestHeaders]);
};

// src/hooks/useFetchAllCategories.ts
import { useState as useState5, useEffect as useEffect5 } from "react";
var useFetchAllCategories = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const [categories, setCategories] = useState5([]);
  const [loading, setLoading] = useState5(false);
  const [error, setError] = useState5(null);
  useEffect5(() => {
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
        setCategories(data.categories || []);
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
import { Button as Button3, Stack as Stack4, Paper as Paper3 } from "@mantine/core";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var RoleSidebar = ({
  roles,
  selected,
  onSelect,
  onAdd
}) => /* @__PURE__ */ jsx7(Paper3, { p: "md", withBorder: true, className: "w-64", children: /* @__PURE__ */ jsxs5(Stack4, { children: [
  roles.map((role) => /* @__PURE__ */ jsx7(
    Button3,
    {
      variant: role === selected ? "filled" : "light",
      onClick: () => onSelect(role),
      children: role
    },
    role
  )),
  /* @__PURE__ */ jsx7(Button3, { variant: "outline", onClick: onAdd, children: "+ Add More" })
] }) });

// src/components/FeatureCategoryTabs.tsx
import { Tabs } from "@mantine/core";
import { jsx as jsx8 } from "react/jsx-runtime";
var FeatureCategoryTabs = ({
  categories,
  selected,
  onSelect
}) => /* @__PURE__ */ jsx8(Tabs, { value: selected, onChange: onSelect, variant: "outline", children: /* @__PURE__ */ jsx8(Tabs.List, { children: categories.map((cat) => /* @__PURE__ */ jsx8(Tabs.Tab, { value: cat, children: cat }, cat)) }) });

// src/components/FeatureToggleTable.tsx
import { Checkbox as Checkbox2, Table, Button as Button4 } from "@mantine/core";
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
var FeatureToggleTable = ({
  features,
  selectedIds,
  onToggle,
  onSave
}) => {
  return /* @__PURE__ */ jsxs6("div", { children: [
    /* @__PURE__ */ jsxs6(Table, { striped: true, highlightOnHover: true, children: [
      /* @__PURE__ */ jsx9("thead", { children: /* @__PURE__ */ jsxs6("tr", { children: [
        /* @__PURE__ */ jsx9("th", { children: "Toggle" }),
        /* @__PURE__ */ jsx9("th", { children: "Feature ID" }),
        /* @__PURE__ */ jsx9("th", { children: "Feature Name" })
      ] }) }),
      /* @__PURE__ */ jsx9("tbody", { children: features.map((f) => /* @__PURE__ */ jsxs6("tr", { children: [
        /* @__PURE__ */ jsx9("td", { children: /* @__PURE__ */ jsx9(
          Checkbox2,
          {
            checked: selectedIds.includes(f.id),
            onChange: () => onToggle(f.id)
          }
        ) }),
        /* @__PURE__ */ jsx9("td", { children: f.id }),
        /* @__PURE__ */ jsx9("td", { children: f.name })
      ] }, f.id)) })
    ] }),
    /* @__PURE__ */ jsx9(Button4, { mt: "md", onClick: onSave, children: "Save Permissions" })
  ] });
};

// src/components/RBACRoleFeatureManager.tsx
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
var RBACRoleFeatureManager = () => {
  const { roles } = useFetchRoles();
  const [selectedRole, setSelectedRole] = useState6("");
  const [selectedCategory, setSelectedCategory] = useState6("dashboard");
  const { categories } = useFetchAllCategories();
  const { features: categoryFeatures = [] } = useFetchFeaturesByCategory(selectedCategory);
  const { addFeatures } = useAddFeaturesToRole();
  useFetchAllFeatures();
  useFetchFeaturesByRole(selectedRole);
  const dispatch = useDispatch3();
  const selectedFeatureIds = useSelector2(
    (state) => state.features.featureIds
  );
  const toggleFeature = (id) => {
    const updated = selectedFeatureIds.includes(id) ? selectedFeatureIds.filter((f) => f !== id) : [...selectedFeatureIds, id];
    dispatch(setFeatures(updated));
  };
  const handleSave = () => __async(void 0, null, function* () {
    try {
      yield addFeatures(selectedRole, selectedFeatureIds);
      alert("Permissions updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update permissions");
    }
  });
  return /* @__PURE__ */ jsxs7(Paper4, { className: "p-6 flex gap-6", withBorder: true, children: [
    /* @__PURE__ */ jsx10(
      RoleSidebar,
      {
        roles,
        selected: selectedRole,
        onSelect: setSelectedRole,
        onAdd: () => {
        }
      }
    ),
    /* @__PURE__ */ jsxs7(Stack5, { className: "flex-1", children: [
      /* @__PURE__ */ jsx10(
        FeatureCategoryTabs,
        {
          categories,
          selected: selectedCategory,
          onSelect: setSelectedCategory
        }
      ),
      /* @__PURE__ */ jsx10(
        FeatureToggleTable,
        {
          features: categoryFeatures,
          selectedIds: selectedFeatureIds,
          onToggle: toggleFeature,
          onSave: handleSave
        }
      )
    ] })
  ] });
};
export {
  FeatureList,
  FeatureUploader,
  RBACProvider,
  RBACRoleFeatureManager,
  RBACSummary,
  RoleManager,
  RoleSelector,
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
