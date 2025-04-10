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
  FeatureList: () => FeatureList,
  FeatureUploader: () => FeatureUploader,
  RBACProvider: () => RBACProvider,
  RBACSummary: () => RBACSummary,
  RoleManager: () => RoleManager,
  RoleSelector: () => RoleSelector,
  featureReducer: () => featureSlice_default,
  featureSlice: () => featureSlice,
  setFeatures: () => setFeatures,
  useAddFeature: () => useAddFeature,
  useAddFeaturesToRole: () => useAddFeaturesToRole,
  useAddRole: () => useAddRole,
  useFeatureAccess: () => useFeatureAccess,
  useFetchPermissions: () => useFetchPermissions,
  useFetchRoles: () => useFetchRoles,
  useRBACContext: () => useRBACContext,
  useRemoveFeaturesFromRole: () => useRemoveFeaturesFromRole,
  useRemoveRole: () => useRemoveRole,
  useUploadFeatureJson: () => useUploadFeatureJson
});
module.exports = __toCommonJS(index_exports);

// src/hooks/useFetchPermissions.ts
var import_react2 = require("react");
var import_react_redux = require("react-redux");

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

// src/hooks/useFetchPermissions.ts
var useFetchPermissions = (roleId) => {
  const dispatch = (0, import_react_redux.useDispatch)();
  const { endpoints, requestHeaders } = useRBACContext();
  (0, import_react2.useEffect)(() => {
    if (!roleId) return;
    const fetchFeatures = () => __async(void 0, null, function* () {
      const res = yield fetch(endpoints.getFeatures(roleId), {
        headers: (requestHeaders == null ? void 0 : requestHeaders()) || {}
      });
      const data = yield res.json();
      const featureIds = data.map((feature) => feature.id);
      dispatch(setFeatures(featureIds));
    });
    fetchFeatures();
  }, [roleId, endpoints, requestHeaders]);
};

// src/hooks/useFeatureAccess.ts
var import_react_redux2 = require("react-redux");
var useFeatureAccess = (featureId) => {
  const featureIds = (0, import_react_redux2.useSelector)((state) => {
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

// src/components/RoleSelector.tsx
var import_core = require("@mantine/core");
var import_jsx_runtime2 = require("react/jsx-runtime");
var RoleSelector = ({
  roles,
  selected,
  onChange,
  label = "Select Role"
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    import_core.Select,
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
var import_react4 = require("react");
var import_dropzone = require("@mantine/dropzone");
var import_core2 = require("@mantine/core");
var import_jsx_runtime3 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dropzone.Dropzone, { onDrop: handleDrop, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_core2.Group, { justify: "center", mih: 100, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_core2.Text, { size: "sm", children: "Drop or click to upload feature JSON" }) }) }),
    error && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_core2.Text, { c: "red", children: error })
  ] });
};

// src/components/RBACSummary.tsx
var import_core3 = require("@mantine/core");
var import_jsx_runtime4 = require("react/jsx-runtime");
var RBACSummary = ({ role, featureIds }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_core3.Card, { shadow: "sm", radius: "md", withBorder: true, p: "lg", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_core3.Stack, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_core3.Text, { fw: 700, size: "lg", children: [
      "Role: ",
      role
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_core3.Text, { fw: 500, children: "Assigned Features:" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_core3.Stack, { gap: 4, children: featureIds.length > 0 ? featureIds.map((id) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_core3.Badge, { children: id }, id)) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_core3.Text, { size: "sm", c: "dimmed", children: "No features assigned" }) })
  ] }) });
};

// src/components/FeatureList.tsx
var import_core4 = require("@mantine/core");
var import_jsx_runtime5 = require("react/jsx-runtime");
var FeatureList = ({
  features,
  selected,
  onToggle,
  primaryColor = "blue"
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_core4.Paper, { shadow: "xs", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_core4.Stack, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_core4.Text, { fw: 600, mb: "sm", children: "Select Features" }),
    features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      import_core4.Checkbox,
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
var import_react5 = require("react");
var import_core5 = require("@mantine/core");
var import_jsx_runtime6 = require("react/jsx-runtime");
var RoleManager = ({ roles, onAdd, primaryColor = "blue" }) => {
  const [newRole, setNewRole] = (0, import_react5.useState)("");
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_core5.Paper, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_core5.Stack, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      import_core5.Input,
      {
        value: newRole,
        onChange: (e) => setNewRole(e.currentTarget.value),
        placeholder: "Enter new role"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_core5.Button, { color: primaryColor, onClick: handleAdd, children: "Add Role" }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_core5.Text, { fw: 600, children: "Existing Roles:" }),
    roles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_core5.Text, { size: "sm", c: "dimmed", children: role }, role))
  ] }) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FeatureList,
  FeatureUploader,
  RBACProvider,
  RBACSummary,
  RoleManager,
  RoleSelector,
  featureReducer,
  featureSlice,
  setFeatures,
  useAddFeature,
  useAddFeaturesToRole,
  useAddRole,
  useFeatureAccess,
  useFetchPermissions,
  useFetchRoles,
  useRBACContext,
  useRemoveFeaturesFromRole,
  useRemoveRole,
  useUploadFeatureJson
});
