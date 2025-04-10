import React, { createContext, useContext } from "react";
import type { RBACConfig } from "../types/RBACConfig"

const RBACContext = createContext<RBACConfig | undefined>(undefined);

export const RBACProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: RBACConfig;
}) => {
  return <RBACContext.Provider value={config}>{children}</RBACContext.Provider>;
};

export const useRBACContext = () => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error("useRBACContext must be used within an RBACProvider");
  }
  return context;
};
