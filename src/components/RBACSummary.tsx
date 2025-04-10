import { Card, Text, Stack, Badge } from "@mantine/core";

interface RBACSummaryProps {
  role: string;
  featureIds: string[];
}

export const RBACSummary: React.FC<RBACSummaryProps> = ({ role, featureIds }) => {
  return (
    <Card shadow="sm" radius="md" withBorder p="lg">
      <Stack>
        <Text fw={700} size="lg">Role: {role}</Text>
        <Text fw={500}>Assigned Features:</Text>
        <Stack gap={4}>
          {featureIds.length > 0 ? (
            featureIds.map((id) => <Badge key={id}>{id}</Badge>)
          ) : (
            <Text size="sm" c="dimmed">No features assigned</Text>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};
