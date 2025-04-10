import React from "react";
import { Checkbox, Stack, Text, Paper } from "@mantine/core";

interface FeatureListProps {
  features: { id: string; name: string }[];
  selected: string[];
  onToggle: (id: string) => void;
  primaryColor?: string;
}

export const FeatureList: React.FC<FeatureListProps> = ({
  features,
  selected,
  onToggle,
  primaryColor = "blue",
}) => {
  return (
    <Paper shadow="xs" p="md" radius="md" withBorder>
      <Stack>
        <Text fw={600} mb="sm">Select Features</Text>
        {features.map((feature) => (
          <Checkbox
            key={feature.id}
            label={feature.name}
            checked={selected.includes(feature.id)}
            onChange={() => onToggle(feature.id)}
            color={primaryColor}
          />
        ))}
      </Stack>
    </Paper>
  );
};
