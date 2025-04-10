import React, { useState } from "react";

interface RoleManagerProps {
  roles: string[];
  onAdd: (role: string) => void;
}

export const RoleManager: React.FC<RoleManagerProps> = ({ roles, onAdd }) => {
  const [newRole, setNewRole] = useState("");

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
        placeholder="New role name"
        className="border p-2"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          onAdd(newRole);
          setNewRole("");
        }}
      >
        Add Role
      </button>
      <ul className="mt-4">
        {roles.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>
    </div>
  );
};
