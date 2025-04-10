var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  featureReducer: () => featureSlice_default,
  useFeatureAccess: () => useFeatureAccess,
  useFetchPermissions: () => useFetchPermissions
});
module.exports = __toCommonJS(index_exports);

// src/hooks/useFetchPermissions.ts
var import_react = require("react");
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

// src/hooks/useFetchPermissions.ts
var useFetchPermissions = (roleId) => {
  const dispatch = (0, import_react_redux.useDispatch)();
  (0, import_react.useEffect)(() => {
    if (!roleId) return;
    const fetchFeatures = () => __async(void 0, null, function* () {
      const res = yield fetch(`/api/features?role=\${roleId}`);
      const data = yield res.json();
      dispatch(setFeatures(data));
    });
    fetchFeatures();
  }, [roleId]);
};

// src/hooks/useFeatureAccess.ts
var import_react_redux2 = require("react-redux");
var useFeatureAccess = (featureId) => {
  const featureIds = (0, import_react_redux2.useSelector)((state) => state.features.featureIds);
  return featureIds.includes(featureId);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  featureReducer,
  useFeatureAccess,
  useFetchPermissions
});
