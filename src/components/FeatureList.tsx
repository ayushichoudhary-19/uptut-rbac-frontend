import React from "react";

interface FeatureListProps {
  features: { id: string; name: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}

export const FeatureList: React.FC<FeatureListProps> = ({
  features,
  selected,
  onToggle,
}) => {
  return (
    <div className="space-y-2">
      {features.map((feature) => (
        <label key={feature.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selected.includes(feature.id)}
            onChange={() => onToggle(feature.id)}
          />
          {feature.name}
        </label>
      ))}
    </div>
  );
};
