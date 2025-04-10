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
  RBACProvider: () => RBACProvider,
  RoleManager: () => RoleManager,
  featureReducer: () => featureSlice_default,
  featureSlice: () => featureSlice,
  setFeatures: () => setFeatures,
  useFeatureAccess: () => useFeatureAccess,
  useFetchPermissions: () => useFetchPermissions,
  useRBACContext: () => useRBACContext
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

// src/components/FeatureList.tsx
var import_core = require("@mantine/core");
var import_jsx_runtime2 = require("react/jsx-runtime");
var FeatureList = ({
  features,
  selected,
  onToggle,
  primaryColor = "blue"
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_core.Paper, { shadow: "xs", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_core.Stack, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_core.Text, { fw: 600, mb: "sm", children: "Select Features" }),
    features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_core.Checkbox,
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
var import_react3 = require("react");

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
var import_core2 = require("@mantine/core");
var import_jsx_runtime3 = require("react/jsx-runtime");
var RoleManager = ({ roles, onAdd, primaryColor = "blue" }) => {
  const [newRole, setNewRole] = (0, import_react3.useState)("");
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_core2.Paper, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_core2.Stack, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_core2.Input,
      {
        value: newRole,
        onChange: (e) => setNewRole(e.currentTarget.value),
        placeholder: "Enter new role"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_core2.Button, { color: primaryColor, onClick: handleAdd, children: "Add Role" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_core2.Text, { fw: 600, children: "Existing Roles:" }),
    roles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_core2.Text, { size: "sm", c: "dimmed", children: role }, role))
  ] }) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FeatureList,
  RBACProvider,
  RoleManager,
  featureReducer,
  featureSlice,
  setFeatures,
  useFeatureAccess,
  useFetchPermissions,
  useRBACContext
});
