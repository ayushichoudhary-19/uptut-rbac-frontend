import { Checkbox, Table, Button } from "@mantine/core";

export const FeatureToggleTable = ({
  features,
  selectedIds,
  onToggle,
  onSave,
}: {
  features: { id: string; name: string }[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onSave: () => void;
}) => {
  return (
    <div>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Toggle</th>
            <th>Feature ID</th>
            <th>Feature Name</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f) => (
            <tr key={f.id}>
              <td>
                <Checkbox
                  checked={selectedIds.includes(f.id)}
                  onChange={() => onToggle(f.id)}
                />
              </td>
              <td>{f.id}</td>
              <td>{f.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button mt="md" onClick={onSave}>
        Save Permissions
      </Button>
    </div>
  );
};
