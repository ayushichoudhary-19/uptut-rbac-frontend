import React, { useState } from "react";
import { Dropzone } from "@mantine/dropzone";
import { Text, Button, Group } from "@mantine/core";

interface FeatureUploaderProps {
  onUpload: (featureIds: string[]) => void;
}

export const FeatureUploader: React.FC<FeatureUploaderProps> = ({ onUpload }) => {
  const [error, setError] = useState<string | null>(null);

  const handleDrop = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (Array.isArray(data)) {
        const ids = data.map((f: any) => f.id || f); // support both plain array and object list
        onUpload(ids);
      } else {
        setError("Invalid JSON format");
      }
    } catch (e) {
      setError("Failed to parse JSON file");
    }
  };

  return (
    <div className="space-y-3">
      <Dropzone onDrop={handleDrop}>
        <Group justify="center" mih={100}>
          <Text size="sm">Drop or click to upload feature JSON</Text>
        </Group>
      </Dropzone>
      {error && <Text c="red">{error}</Text>}
    </div>
  );
};
