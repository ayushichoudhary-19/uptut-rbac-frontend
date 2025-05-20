import { memo } from "react";
import { Checkbox, Table, Button } from "@mantine/core";

export const FeatureToggleTable = memo(({
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
            <th>Select</th>
            <th>Feature Name</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature,idx) => (
            <tr key={idx}>
              <td>
                <Checkbox
                  checked={selectedIds.includes(feature.id)}
                  onChange={() => onToggle(feature.id)}
                />
              </td>
              <td>{feature.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button mt="md" onClick={onSave}>
        Save Changes
      </Button>
    </div>
  );
});

FeatureToggleTable.displayName = 'FeatureToggleTable';
