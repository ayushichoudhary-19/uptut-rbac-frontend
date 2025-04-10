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
import { useState } from "react";

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

// src/components/RoleManager.tsx
import { Button, Input, Text as Text2, Paper as Paper2, Stack as Stack2 } from "@mantine/core";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var RoleManager = ({ roles, onAdd, primaryColor = "blue" }) => {
  const [newRole, setNewRole] = useState("");
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
export {
  FeatureList,
  RBACProvider,
  RoleManager,
  featureSlice_default as featureReducer,
  featureSlice,
  setFeatures,
  useFeatureAccess,
  useFetchPermissions,
  useRBACContext
};
