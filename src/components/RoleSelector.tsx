import React from "react";
import { Select } from "@mantine/core";

interface RoleSelectorProps {
  roles: string[];
  selected: string | null;
  onChange: (value: string | null) => void;
  label?: string;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  roles,
  selected,
  onChange,
  label = "Select Role",
}) => {
  return (
    <Select
      label={label}
      value={selected}
      onChange={onChange}
      data={roles.map((role) => ({ value: role, label: role }))}
      placeholder="Pick a role"
      clearable
      searchable
    />
  );
};
