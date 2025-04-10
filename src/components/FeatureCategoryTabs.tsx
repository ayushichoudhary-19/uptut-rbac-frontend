import React from "react";
import { Tabs } from "@mantine/core";

export const FeatureCategoryTabs = ({
  categories,
  selected,
  onSelect,
}: {
  categories: string[];
  selected: string;
  onSelect: (c: string) => void;
}) => {
  console.log("Rendering categories:", categories);

  return (
    <Tabs value={selected} onChange={onSelect} variant="outline">
      <Tabs.List>
        {categories.map((cat) => (
          <Tabs.Tab key={cat} value={cat}>
            {cat}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};
