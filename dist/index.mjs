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

// src/hooks/useFetchPermissions.ts
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

// src/hooks/useFetchPermissions.ts
var useFetchPermissions = (roleId) => {
  const dispatch = useDispatch();
  const { endpoints, requestHeaders } = useRBACContext();
  useEffect(() => {
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
var useBulkRemoveFeatures = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const removeFeatures = (role, featureIds) => __async(void 0, null, function* () {
    if (!endpoints.removeFeaturesFromRole) {
      throw new Error("bulkRemoveFeatures endpoint not defined");
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
  return { removeFeatures };
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
var useBulkAddFeatures = () => {
  const { endpoints, requestHeaders } = useRBACContext();
  const addFeaturesToRole = (role, featureIds) => __async(void 0, null, function* () {
    if (!endpoints.addFeaturesToRole) {
      throw new Error("bulkAddFeatures endpoint not defined");
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
  return { addFeaturesToRole };
};

// src/components/RoleSelector.tsx
import { Select } from "@mantine/core";
import { jsx as jsx2 } from "react/jsx-runtime";
var RoleSelector = ({
  roles,
  selected,
  onChange,
  label = "Select Role"
}) => {
  return /* @__PURE__ */ jsx2(
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
import { useState as useState2 } from "react";
import { Dropzone } from "@mantine/dropzone";
import { Text, Group } from "@mantine/core";
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var FeatureUploader = ({ onUpload }) => {
  const [error, setError] = useState2(null);
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
    /* @__PURE__ */ jsx3(Dropzone, { onDrop: handleDrop, children: /* @__PURE__ */ jsx3(Group, { justify: "center", mih: 100, children: /* @__PURE__ */ jsx3(Text, { size: "sm", children: "Drop or click to upload feature JSON" }) }) }),
    error && /* @__PURE__ */ jsx3(Text, { c: "red", children: error })
  ] });
};

// src/components/RBACSummary.tsx
import { Card, Text as Text2, Stack, Badge } from "@mantine/core";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var RBACSummary = ({ role, featureIds }) => {
  return /* @__PURE__ */ jsx4(Card, { shadow: "sm", radius: "md", withBorder: true, p: "lg", children: /* @__PURE__ */ jsxs2(Stack, { children: [
    /* @__PURE__ */ jsxs2(Text2, { fw: 700, size: "lg", children: [
      "Role: ",
      role
    ] }),
    /* @__PURE__ */ jsx4(Text2, { fw: 500, children: "Assigned Features:" }),
    /* @__PURE__ */ jsx4(Stack, { gap: 4, children: featureIds.length > 0 ? featureIds.map((id) => /* @__PURE__ */ jsx4(Badge, { children: id }, id)) : /* @__PURE__ */ jsx4(Text2, { size: "sm", c: "dimmed", children: "No features assigned" }) })
  ] }) });
};

// src/components/FeatureList.tsx
import { Checkbox, Stack as Stack2, Text as Text3, Paper } from "@mantine/core";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var FeatureList = ({
  features,
  selected,
  onToggle,
  primaryColor = "blue"
}) => {
  return /* @__PURE__ */ jsx5(Paper, { shadow: "xs", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs3(Stack2, { children: [
    /* @__PURE__ */ jsx5(Text3, { fw: 600, mb: "sm", children: "Select Features" }),
    features.map((feature) => /* @__PURE__ */ jsx5(
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
import { useState as useState3 } from "react";
import { Button as Button2, Input, Text as Text4, Paper as Paper2, Stack as Stack3 } from "@mantine/core";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var RoleManager = ({ roles, onAdd, primaryColor = "blue" }) => {
  const [newRole, setNewRole] = useState3("");
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
  return /* @__PURE__ */ jsx6(Paper2, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs4(Stack3, { children: [
    /* @__PURE__ */ jsx6(
      Input,
      {
        value: newRole,
        onChange: (e) => setNewRole(e.currentTarget.value),
        placeholder: "Enter new role"
      }
    ),
    /* @__PURE__ */ jsx6(Button2, { color: primaryColor, onClick: handleAdd, children: "Add Role" }),
    /* @__PURE__ */ jsx6(Text4, { fw: 600, children: "Existing Roles:" }),
    roles.map((role) => /* @__PURE__ */ jsx6(Text4, { size: "sm", c: "dimmed", children: role }, role))
  ] }) });
};
export {
  FeatureList,
  FeatureUploader,
  RBACProvider,
  RBACSummary,
  RoleManager,
  RoleSelector,
  featureSlice_default as featureReducer,
  featureSlice,
  setFeatures,
  useAddFeature,
  useAddRole,
  useBulkAddFeatures,
  useBulkRemoveFeatures,
  useFeatureAccess,
  useFetchPermissions,
  useFetchRoles,
  useRBACContext,
  useRemoveRole,
  useUploadFeatureJson
};
