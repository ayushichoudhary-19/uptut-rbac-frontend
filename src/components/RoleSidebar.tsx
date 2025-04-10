import { Button, Stack, Paper } from "@mantine/core";

export const RoleSidebar = ({
  roles,
  selected,
  onSelect,
  onAdd,
}: {
  roles: Array<{ id: string; name: string }>;
  selected: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
}) => {
  return (
    <Stack className="w-64">
      <Button onClick={onAdd}>
       + Add Role
      </Button>
      <Stack gap="xs">
        {roles.map((role) => (
          <Button
            key={role.id}
            variant={selected === role.id ? "filled" : "subtle"}
            onClick={() => onSelect(role.id)}
          >
            {role.name}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};
