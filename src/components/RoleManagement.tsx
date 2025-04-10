import { useState } from 'react';
import { TextInput, Button, Paper, Stack } from '@mantine/core';

interface RoleManagementProps {
  onRoleCreate: (roleId: string, roleName: string) => void;
  onCancel: () => void;
}

export const RoleManagement: React.FC<RoleManagementProps> = ({ onRoleCreate, onCancel }) => {
  const [roleName, setRoleName] = useState('');
  const [roleId, setRoleId] = useState('');

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/(^_|_$)/g, '');
  };

  const handleNameChange = (value: string) => {
    setRoleName(value);
    setRoleId(generateSlug(value));
  };

  const handleSubmit = () => {
    if (roleName && roleId) {
      onRoleCreate(roleId, roleName);
    }
  };

  return (
    <Paper p="xl" shadow="sm">
      <Stack gap="md">
        <TextInput
          label="Role Name"
          value={roleName}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g. System Administrator"
          required
        />
        <TextInput
          label="Role ID"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          placeholder="system_administrator"
          description="Auto-generated from name, but can be modified"
        />
        <div className="flex gap-4">
          <Button onClick={handleSubmit}>Create Role</Button>
          <Button variant="subtle" onClick={onCancel}>Cancel</Button>
        </div>
      </Stack>
    </Paper>
  );
};