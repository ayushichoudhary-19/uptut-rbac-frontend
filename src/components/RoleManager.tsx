import React, { useState } from "react";
import { useAddRole } from "../hooks/useAddRole";
import { Button, Input, Text, Paper, Stack } from "@mantine/core";

interface RoleManagerProps {
  roles: string[];
  onAdd: (role: string) => void;
  primaryColor?: string;
}

export const RoleManager: React.FC<RoleManagerProps> = ({ roles, onAdd, primaryColor = "blue" }) => {
  const [newRole, setNewRole] = useState("");
  const { addRole } = useAddRole();

  const handleAdd = async () => {
    if (!newRole) return;
    try {
      await addRole(newRole);
      onAdd(newRole);
      setNewRole("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder>
      <Stack>
        <Input
          value={newRole}
          onChange={(e) => setNewRole(e.currentTarget.value)}
          placeholder="Enter new role"
        />
        <Button color={primaryColor} onClick={handleAdd}>Add Role</Button>
        <Text fw={600}>Existing Roles:</Text>
        {roles.map((role) => (
          <Text key={role} size="sm" c="dimmed">{role}</Text>
        ))}
      </Stack>
    </Paper>
  );
};