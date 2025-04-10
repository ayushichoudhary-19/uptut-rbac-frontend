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
  getFeatureUrl
}) => {
  return /* @__PURE__ */ jsx(RBACContext.Provider, { value: { getFeatureUrl }, children });
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
  const { getFeatureUrl } = useRBACContext();
  useEffect(() => {
    if (!roleId) return;
    const fetchFeatures = () => __async(void 0, null, function* () {
      const res = yield fetch(getFeatureUrl(roleId));
      const data = yield res.json();
      dispatch(setFeatures(data));
    });
    fetchFeatures();
  }, [roleId, getFeatureUrl]);
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
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var FeatureList = ({
  features,
  selected,
  onToggle
}) => {
  return /* @__PURE__ */ jsx2("div", { className: "space-y-2", children: features.map((feature) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx2(
      "input",
      {
        type: "checkbox",
        checked: selected.includes(feature.id),
        onChange: () => onToggle(feature.id)
      }
    ),
    feature.name
  ] }, feature.id)) });
};

// src/components/RoleManager.tsx
import { useState } from "react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var RoleManager = ({ roles, onAdd }) => {
  const [newRole, setNewRole] = useState("");
  return /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx3(
      "input",
      {
        type: "text",
        value: newRole,
        onChange: (e) => setNewRole(e.target.value),
        placeholder: "New role name",
        className: "border p-2"
      }
    ),
    /* @__PURE__ */ jsx3(
      "button",
      {
        className: "bg-blue-500 text-white px-4 py-2 rounded",
        onClick: () => {
          onAdd(newRole);
          setNewRole("");
        },
        children: "Add Role"
      }
    ),
    /* @__PURE__ */ jsx3("ul", { className: "mt-4", children: roles.map((role) => /* @__PURE__ */ jsx3("li", { children: role }, role)) })
  ] });
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
