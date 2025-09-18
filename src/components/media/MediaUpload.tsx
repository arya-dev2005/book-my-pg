// components/media/MediaUpload.tsx
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";

interface MediaData {
  url: string;
  fileType: string;
  fileName: string;
  id: string;
}

interface MediaUploadProps {
  onUpload: (mediaData: MediaData) => void;
  entityType?: "pg" | "college" | "food" | "transport";
  entityId?: string;
}

export function MediaUpload({
  onUpload,
  entityType,
  entityId,
}: MediaUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      if (entityType && entityId) {
        formData.append(`${entityType}Id`, entityId);
      }

      const response = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const mediaData = await response.json();
      onUpload(mediaData);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <label htmlFor="media-upload" className="sr-only">
          Upload media file
        </label>
        <input
          id="media-upload"
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
          title="Upload media file"
        />
        <Button
          type="button"
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Media"}
        </Button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <p className="text-xs text-gray-500">
        Supported: Images (JPG, PNG, WebP) and Videos (MP4, WebM). Max 10MB.
      </p>
    </div>
  );
}
