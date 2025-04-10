import { Button, Stack, Paper } from "@mantine/core";

export const RoleSidebar = ({
  roles,
  selected,
  onSelect,
  onAdd,
}: {
  roles: string[];
  selected: string;
  onSelect: (r: string) => void;
  onAdd: () => void;
}) => (
  <Paper p="md" withBorder className="w-64">
    <Stack>
      {roles.map((role) => (
        <Button
          key={role}
          variant={role === selected ? "filled" : "light"}
          onClick={() => onSelect(role)}
        >
          {role}
        </Button>
      ))}
      <Button variant="outline" onClick={onAdd}>
        + Add More
      </Button>
    </Stack>
  </Paper>
);
