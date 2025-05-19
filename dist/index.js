var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  FeatureUploader: () => FeatureUploader,
  RBACProvider: () => RBACProvider,
  RBACRoleFeatureManager: () => RBACRoleFeatureManager,
  RBACSummary: () => RBACSummary,
  allFeaturesSlice: () => allFeaturesSlice,
  featureReducer: () => featureSlice_default,
  featureSlice: () => featureSlice,
  setAllFeatures: () => setAllFeatures,
  setFeatures: () => setFeatures,
  useAddFeature: () => useAddFeature,
  useAddFeaturesToRole: () => useAddFeaturesToRole,
  useAddRole: () => useAddRole,
  useFeatureAccess: () => useFeatureAccess,
  useFetchFeaturesByRole: () => useFetchFeaturesByRole,
  useFetchRoles: () => useFetchRoles,
  useRBACContext: () => useRBACContext,
  useRemoveFeaturesFromRole: () => useRemoveFeaturesFromRole,
  useRemoveRole: () => useRemoveRole,
  useUploadFeatureJson: () => useUploadFeatureJson
});
module.exports = __toCommonJS(index_exports);

// src/hooks/useFetchFeaturesByRole.ts
var import_react2 = require("react");

// src/context/RBACContext.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var defaultEndpoints = {
  getRoles: () => "/api/roles",
  getFeatures: (roleId) => `/api/features/role/${roleId}`,
  getAllFeatures: () => "/api/features",
  getFeaturesByCategory: (categoryId) => `/api/features/category/${categoryId}`,
  getAllCategories: () => "/api/feature-categories",
  createRole: "/api/roles",
  createFeature: "/api/features",
  uploadFeatureJson: "/api/features/bulk",
  addFeaturesToRole: "/api/roles/assign-features",
  removeFeaturesFromRole: "/api/roles/remove-features",
  removeRole: "/api/roles/delete"
};
var RBACContext = (0, import_react.createContext)(void 0);
var RBACProvider = ({
  children,
  config
}) => {
  const mergedEndpoints = __spreadValues(__spreadValues({}, defaultEndpoints), config.endpoints);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    RBACContext.Provider,
    {
      value: {
        endpoints: mergedEndpoints,
        requestHeaders: config.requestHeaders
      },
      children
    }
  );
};
var useRBACContext = () => {
  const context = (0, import_react.useContext)(RBACContext);
  if (!context) {
    throw new Error("useRBACContext must be used within an RBACProvider");
  }
  return context;
};

// src/hooks/useFetchFeaturesByRole.ts
var useFetchFeaturesByRole = (roleId) => {
  const [features, setFeatures2] = (0, import_react2.useState)([]);
  const [loading, setLoading] = (0, import_react2.useState)(false);
  const [error, setError] = (0, import_react2.useState)(null);
  const { endpoints, requestHeaders } = useRBACContext();
  (0, import_react2.useEffect)(() => {
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
var import_react_redux = require("react-redux");
var useFeatureAccess = (featureId) => {
  const featureIds = (0, import_react_redux.useSelector)((state) => {
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
var import_react3 = require("react");
var useFetchRoles = () => {
  const [roles, setRoles] = (0, import_react3.useState)([]);
  const [loading, setLoading] = (0, import_react3.useState)(false);
  const [error, setError] = (0, import_react3.useState)("");
  const { endpoints, requestHeaders } = useRBACContext();
  const fetchRoles = (0, import_react3.useCallback)(() => __async(void 0, null, function* () {
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
      setRoles(
        (data || []).map((r) => ({
          id: r.id || r._id,
          name: r.name
        }))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }), [endpoints, requestHeaders]);
  (0, import_react3.useEffect)(() => {
    fetchRoles();
  }, [fetchRoles]);
  return (0, import_react3.useMemo)(
    () => ({
      roles,
      loading,
      error,
      refetchRoles: fetchRoles
    }),
    [roles, loading, error, fetchRoles]
  );
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
var import_react4 = require("react");
var import_dropzone = require("@mantine/dropzone");
var import_core = require("@mantine/core");
var import_jsx_runtime2 = require("react/jsx-runtime");
var FeatureUploader = ({ onUpload }) => {
  const [error, setError] = (0, import_react4.useState)(null);
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dropzone.Dropzone, { onDrop: handleDrop, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_core.Group, { justify: "center", mih: 100, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_core.Text, { size: "sm", children: "Drop or click to upload feature JSON" }) }) }),
    error && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_core.Text, { c: "red", children: error })
  ] });
};

// src/components/RBACSummary.tsx
var import_core2 = require("@mantine/core");
var import_jsx_runtime3 = require("react/jsx-runtime");
var RBACSummary = ({ role, featureIds }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_core2.Card, { shadow: "sm", radius: "md", withBorder: true, p: "lg", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_core2.Stack, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_core2.Text, { fw: 700, size: "lg", children: [
      "Role: ",
      role
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_core2.Text, { fw: 500, children: "Assigned Features:" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_core2.Stack, { gap: 4, children: featureIds.length > 0 ? featureIds.map((id) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_core2.Badge, { children: id }, id)) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_core2.Text, { size: "sm", c: "dimmed", children: "No features assigned" }) })
  ] }) });
};

// src/components/RBACRoleFeatureManager.tsx
var import_react10 = require("react");
var import_react_redux2 = require("react-redux");
var import_core7 = require("@mantine/core");

// src/hooks/useFetchFeaturesByCategory.ts
var import_react5 = require("react");
var useFetchFeaturesByCategory = (category) => {
  const [features, setFeatures2] = (0, import_react5.useState)([]);
  const [loading, setLoading] = (0, import_react5.useState)(false);
  const [error, setError] = (0, import_react5.useState)(null);
  const { endpoints, requestHeaders } = useRBACContext();
  const fetchFeatures = (0, import_react5.useCallback)(() => __async(void 0, null, function* () {
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
  (0, import_react5.useEffect)(() => {
    if (category) {
      fetchFeatures();
    }
  }, [category, fetchFeatures]);
  return (0, import_react5.useMemo)(() => ({
    features,
    loading,
    error
  }), [features, loading, error]);
};

// src/hooks/useFetchAllCategories.ts
var import_react6 = require("react");
var useFetchAllCategories = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const [loading, setLoading] = (0, import_react6.useState)(false);
  const [error, setError] = (0, import_react6.useState)(null);
  const [categories, setCategories] = (0, import_react6.useState)([]);
  (0, import_react6.useEffect)(() => {
    const url = endpoints.getAllCategories();
    if (!url) return;
    const fetchCategories = () => __async(void 0, null, function* () {
      setLoading(true);
      try {
        const res = yield fetch(url, {
          headers: (requestHeaders == null ? void 0 : requestHeaders()) || {}
        });
        const data = yield res.json();
        const normalized = (data || []).map((c) => ({
          id: c.id || c._id,
          name: c.name
        }));
        setCategories(normalized);
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
var import_core3 = require("@mantine/core");
var import_jsx_runtime4 = require("react/jsx-runtime");
var RoleSidebar = ({
  roles,
  selected,
  onSelect,
  onAdd
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_core3.Stack, { className: "w-64", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_core3.Button, { onClick: onAdd, children: "+ Add Role" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_core3.Stack, { gap: "xs", children: roles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      import_core3.Button,
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
var import_react7 = require("react");
var import_core4 = require("@mantine/core");
var import_jsx_runtime5 = require("react/jsx-runtime");
var FeatureCategoryTabs = (0, import_react7.memo)(({
  categories,
  selected,
  onSelect
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_core4.Tabs, { value: selected, onChange: onSelect, variant: "outline", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_core4.Tabs.List, { children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_core4.Tabs.Tab, { value: cat.id, children: cat.name }, cat.id)) }) });
});
FeatureCategoryTabs.displayName = "FeatureCategoryTabs";

// src/components/FeatureToggleTable.tsx
var import_react8 = require("react");
var import_core5 = require("@mantine/core");
var import_jsx_runtime6 = require("react/jsx-runtime");
var FeatureToggleTable = (0, import_react8.memo)(({
  features,
  selectedIds,
  onToggle,
  onSave
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_core5.Table, { striped: true, highlightOnHover: true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("th", { children: "Select" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("th", { children: "Feature Name" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("tbody", { children: features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          import_core5.Checkbox,
          {
            checked: selectedIds.includes(feature.id),
            onChange: () => onToggle(feature.id)
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("td", { children: feature.name })
      ] }, feature.id)) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_core5.Button, { mt: "md", onClick: onSave, children: "Save Changes" })
  ] });
});
FeatureToggleTable.displayName = "FeatureToggleTable";

// src/store/featureSlice.ts
var import_toolkit = require("@reduxjs/toolkit");
var initialState = {
  featureIds: []
};
var featureSlice = (0, import_toolkit.createSlice)({
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
var import_react9 = require("react");
var import_core6 = require("@mantine/core");
var import_jsx_runtime7 = require("react/jsx-runtime");
var RoleManagement = ({ onRoleCreate, onCancel }) => {
  const [roleName, setRoleName] = (0, import_react9.useState)("");
  const [roleId, setRoleId] = (0, import_react9.useState)("");
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_core6.Paper, { p: "xl", shadow: "sm", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_core6.Stack, { gap: "md", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      import_core6.TextInput,
      {
        label: "Role Name",
        value: roleName,
        onChange: (e) => handleNameChange(e.target.value),
        placeholder: "e.g. System Administrator",
        required: true
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      import_core6.TextInput,
      {
        label: "Role ID",
        value: roleId,
        onChange: (e) => setRoleId(e.target.value),
        placeholder: "system_administrator",
        description: "Auto-generated from name, but can be modified"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_core6.Button, { onClick: handleSubmit, children: "Create Role" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_core6.Button, { variant: "subtle", onClick: onCancel, children: "Cancel" })
    ] })
  ] }) });
};

// src/components/RBACRoleFeatureManager.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var RBACRoleFeatureManager = (0, import_react10.memo)(() => {
  const { roles, refetchRoles } = useFetchRoles();
  const [selectedRole, setSelectedRole] = (0, import_react10.useState)("");
  const [selectedCategory, setSelectedCategory] = (0, import_react10.useState)("");
  const { categories } = useFetchAllCategories();
  const { addRole } = useAddRole();
  const { addFeatures } = useAddFeaturesToRole();
  const dispatch = (0, import_react_redux2.useDispatch)();
  const { features: categoryFeatures = [] } = useFetchFeaturesByCategory(selectedCategory);
  const { features: roleFeatures = [] } = useFetchFeaturesByRole(selectedRole);
  const memoizedCategoryFeatures = (0, import_react10.useMemo)(
    () => categoryFeatures,
    [categoryFeatures]
  );
  const [selectedFeatureIds, setSelectedFeatureIds] = (0, import_react10.useState)([]);
  const [isCreatingRole, setIsCreatingRole] = (0, import_react10.useState)(false);
  (0, import_react10.useEffect)(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);
  const roleFeatureIds = roleFeatures.map((f) => f.id);
  const memoizedRoleFeatureIds = (0, import_react10.useMemo)(
    () => roleFeatures.map((f) => f.id),
    [roleFeatures]
  );
  (0, import_react10.useEffect)(() => {
    if (selectedRole) {
      setSelectedFeatureIds(memoizedRoleFeatureIds);
    }
  }, [selectedRole, memoizedRoleFeatureIds]);
  const toggleFeature = (0, import_react10.useCallback)((featureId) => {
    setSelectedFeatureIds((prev) => {
      const isSelected = prev.includes(featureId);
      console.log("Toggling feature:", featureId, "Current state:", isSelected);
      return isSelected ? prev.filter((id) => id !== featureId) : [...prev, featureId];
    });
  }, []);
  const handleSave = (0, import_react10.useCallback)(() => __async(void 0, null, function* () {
    if (!selectedRole) return;
    try {
      yield addFeatures(selectedRole, selectedFeatureIds);
      dispatch(setFeatures(selectedFeatureIds));
    } catch (error) {
      console.error("Failed to save features:", error);
    }
  }), [selectedRole, selectedFeatureIds, addFeatures, dispatch]);
  const handleCreateRole = (0, import_react10.useCallback)(
    (roleId, roleName) => __async(void 0, null, function* () {
      try {
        yield addRole({ id: roleId, name: roleName });
        setIsCreatingRole(false);
        yield refetchRoles();
        setSelectedRole(roleId);
      } catch (error) {
        console.error("Failed to create role:", error);
      }
    }),
    [addRole, refetchRoles]
  );
  const handleCategorySelect = (0, import_react10.useCallback)((category) => {
    setSelectedCategory(category);
  }, []);
  const handleRoleSelect = (0, import_react10.useCallback)((role) => {
    setSelectedRole(role);
  }, []);
  if (isCreatingRole) {
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      RoleManagement,
      {
        onRoleCreate: handleCreateRole,
        onCancel: () => setIsCreatingRole(false)
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_core7.Paper, { className: "p-6 flex gap-6", withBorder: true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      RoleSidebar,
      {
        roles,
        selected: selectedRole,
        onSelect: handleRoleSelect,
        onAdd: () => setIsCreatingRole(true)
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_core7.Stack, { className: "flex-1", children: selectedCategory && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        FeatureCategoryTabs,
        {
          categories,
          selected: selectedCategory,
          onSelect: handleCategorySelect
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        FeatureToggleTable,
        {
          features: memoizedCategoryFeatures,
          selectedIds: selectedFeatureIds,
          onToggle: toggleFeature,
          onSave: handleSave
        }
      )
    ] }) })
  ] });
});
RBACRoleFeatureManager.displayName = "RBACRoleFeatureManager";

// src/store/allFeaturesSlice.ts
var import_toolkit2 = require("@reduxjs/toolkit");
var initialState2 = {
  allFeatures: []
};
var allFeaturesSlice = (0, import_toolkit2.createSlice)({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FeatureUploader,
  RBACProvider,
  RBACRoleFeatureManager,
  RBACSummary,
  allFeaturesSlice,
  featureReducer,
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
});
