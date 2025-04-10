import React, { createContext, useContext } from "react";

interface RBACContextType {
  getFeatureUrl: (roleId: string) => string;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

export const RBACProvider = ({
  children,
  getFeatureUrl,
}: {
  children: React.ReactNode;
  getFeatureUrl: (roleId: string) => string;
}) => {
  return (
    <RBACContext.Provider value={{ getFeatureUrl }}>
      {children}
    </RBACContext.Provider>
  );
};

export const useRBACContext = () => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error("useRBACContext must be used within an RBACProvider");
  }
  return context;
};
