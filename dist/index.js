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
var RBACContext = (0, import_react.createContext)(void 0);
var RBACProvider = ({
  children,
  config
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RBACContext.Provider, { value: config, children });
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
var import_react3 = require("react");
var useFetchRoles = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const [roles, setRoles] = (0, import_react3.useState)([]);
  const [loading, setLoading] = (0, import_react3.useState)(false);
  const [error, setError] = (0, import_react3.useState)(null);
  (0, import_react3.useEffect)(() => {
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
var import_react7 = require("react");
var import_core6 = require("@mantine/core");

// src/hooks/useFetchFeaturesByCategory.ts
var import_react5 = require("react");
var useFetchFeaturesByCategory = (category) => {
  const [features, setFeatures2] = (0, import_react5.useState)([]);
  const [loading, setLoading] = (0, import_react5.useState)(false);
  const [error, setError] = (0, import_react5.useState)(null);
  const { endpoints, requestHeaders } = useRBACContext();
  (0, import_react5.useEffect)(() => {
    if (!category) return;
    const fetchFeatures = () => __async(void 0, null, function* () {
      setLoading(true);
      try {
        const res = yield fetch(endpoints.getFeaturesByCategory(category), {
          headers: (requestHeaders == null ? void 0 : requestHeaders()) || {}
        });
        const data = yield res.json();
        setFeatures2(data || []);
        console.log("Fetched features:", data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching features:", err);
      } finally {
        setLoading(false);
      }
    });
    fetchFeatures();
  }, [category, endpoints, requestHeaders]);
  return { features, loading, error };
};

// src/hooks/useFetchAllCategories.ts
var import_react6 = require("react");
var useFetchAllCategories = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const [categories, setCategories] = (0, import_react6.useState)([]);
  const [loading, setLoading] = (0, import_react6.useState)(false);
  const [error, setError] = (0, import_react6.useState)(null);
  (0, import_react6.useEffect)(() => {
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
var import_core3 = require("@mantine/core");
var import_jsx_runtime4 = require("react/jsx-runtime");
var RoleSidebar = ({
  roles,
  selected,
  onSelect,
  onAdd
}) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_core3.Paper, { p: "md", withBorder: true, className: "w-64", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_core3.Stack, { children: [
  roles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    import_core3.Button,
    {
      variant: role === selected ? "filled" : "light",
      onClick: () => onSelect(role),
      children: role
    },
    role
  )),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_core3.Button, { variant: "outline", onClick: onAdd, children: "+ Add More" })
] }) });

// src/components/FeatureCategoryTabs.tsx
var import_core4 = require("@mantine/core");
var import_jsx_runtime5 = require("react/jsx-runtime");
var FeatureCategoryTabs = ({
  categories,
  selected,
  onSelect
}) => {
  console.log("Rendering categories:", categories);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_core4.Tabs, { value: selected, onChange: onSelect, variant: "outline", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_core4.Tabs.List, { children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_core4.Tabs.Tab, { value: cat, children: cat }, cat)) }) });
};

// src/components/FeatureToggleTable.tsx
var import_core5 = require("@mantine/core");
var import_jsx_runtime6 = require("react/jsx-runtime");
var FeatureToggleTable = ({
  features,
  selectedIds,
  onToggle,
  onSave
}) => {
  console.log("Features received in table:", features);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_core5.Table, { striped: true, highlightOnHover: true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("th", { children: "Toggle" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("th", { children: "Feature ID" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("th", { children: "Feature Name" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("tbody", { children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          import_core5.Checkbox,
          {
            checked: selectedIds.includes(f.id),
            onChange: () => onToggle(f.id)
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("td", { children: f.id }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("td", { children: f.name })
      ] }, f.id)) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_core5.Button, { mt: "md", onClick: onSave, children: "Save Permissions" })
  ] });
};

// src/components/RBACRoleFeatureManager.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var RBACRoleFeatureManager = () => {
  const { roles } = useFetchRoles();
  const [selectedRole, setSelectedRole] = (0, import_react7.useState)("");
  const [selectedCategory, setSelectedCategory] = (0, import_react7.useState)("");
  const { categories } = useFetchAllCategories();
  const { features: categoryFeatures = [] } = useFetchFeaturesByCategory(selectedCategory);
  console.log("Selected Category:", selectedCategory);
  console.log("Category Features:", categoryFeatures);
  const { features: roleFeatures } = useFetchFeaturesByRole(selectedRole);
  const roleFeatureIds = roleFeatures.map((f) => f.id);
  const { addFeatures } = useAddFeaturesToRole();
  const [selectedFeatureIds, setSelectedFeatureIds] = (0, import_react7.useState)(roleFeatureIds);
  const toggleFeature = (id) => {
    const updated = selectedFeatureIds.includes(id) ? selectedFeatureIds.filter((f) => f !== id) : [...selectedFeatureIds, id];
    setSelectedFeatureIds(updated);
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
  (0, import_react7.useEffect)(() => {
    if (categories.length && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_core6.Paper, { className: "p-6 flex gap-6", withBorder: true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      RoleSidebar,
      {
        roles,
        selected: selectedRole,
        onSelect: setSelectedRole,
        onAdd: () => {
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_core6.Stack, { className: "flex-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        FeatureCategoryTabs,
        {
          categories,
          selected: selectedCategory,
          onSelect: setSelectedCategory
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
