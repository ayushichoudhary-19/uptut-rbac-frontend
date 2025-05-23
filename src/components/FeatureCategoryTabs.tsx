import { memo } from "react";
import { Tabs } from "@mantine/core";

type FeatureCategory = {
  id: string;
  name: string;
};

export const FeatureCategoryTabs = memo(({
  categories,
  selected,
  onSelect,
}: {
  categories: FeatureCategory[];
  selected: string;
  onSelect: (id: string) => void;
}) => {
  return (
    <Tabs value={selected} onChange={onSelect} variant="outline">
      <Tabs.List>
        {categories.map((cat) => (
          <Tabs.Tab key={cat.id} value={cat.id}>
            {cat.name}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
});

FeatureCategoryTabs.displayName = 'FeatureCategoryTabs';
