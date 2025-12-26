"use client";

import { useState, useCallback } from "react";
import { FileRejection } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export interface UploadFile {
  id: string;
  file: File;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  url?: string;
}

export function useUpload() {
  const [files, setFiles] = useState<UploadFile[]>([]);

  // -----------------------------
  // Get presigned URL from backend
  // -----------------------------
  async function getPresignedUrl(file: File) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      if (!res.ok) throw new Error("Failed to get presigned URL");

      const { presignedUrl, key } = await res.json();
      return { presignedUrl, key };
    } catch (err) {
      throw new Error("Failed to get presigned URL");
    }
  }

  // -----------------------------
  // Upload file to S3 with progress
  // -----------------------------
  const uploadFile = async (file: File) => {
    setFiles((prev) =>
      prev.map((f) => (f.file === file ? { ...f, uploading: true } : f))
    );

    try {
      const { presignedUrl, key } = await getPresignedUrl(file);

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100;
            setFiles((prev) =>
              prev.map((f) =>
                f.file === file
                  ? { ...f, progress: Math.round(percent), key }
                  : f
              )
            );
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFiles((prev) =>
              prev.map((f) =>
                f.file === file
                  ? {
                      ...f,
                      uploading: false,
                      progress: 100,
                      error: false,
                      url: presignedUrl,
                    }
                  : f
              )
            );
            toast.success("Upload completed");
            resolve();
          } else {
            reject(new Error("Upload failed"));
          }
        };

        xhr.onerror = () => reject(new Error("Upload failed"));

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          f.file === file
            ? { ...f, uploading: false, error: true, progress: 0 }
            : f
        )
      );

      toast.error("Upload failed");
    }
  };

  // -----------------------------
  // Remove file
  // -----------------------------
  const removeFile = async (fileId: string) => {
    const fileToRemove = files.find((f) => f.id === fileId);
    if (!fileToRemove) return;

    if (fileToRemove.objectUrl) URL.revokeObjectURL(fileToRemove.objectUrl);

    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, isDeleting: true } : f))
    );

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/upload`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: fileToRemove.key }),
      });

      if (!res.ok) throw new Error();

      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      toast.success("File removed");
    } catch (err) {
      toast.error("Failed to remove file");
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, isDeleting: false, error: true } : f
        )
      );
    }
  };

  // -----------------------------
  // Handle accepted files
  // -----------------------------
  const handleFiles = useCallback((accepted: File[]) => {
    if (accepted.length === 0) return;

    setFiles((prev) => [
      ...prev,
      ...accepted.map((file) => ({
        id: uuidv4(),
        file,
        uploading: false,
        progress: 0,
        isDeleting: false,
        error: false,
        objectUrl: URL.createObjectURL(file),
      })),
    ]);

    accepted.forEach(uploadFile);
  }, []);

  // -----------------------------
  // Handle rejected files
  // -----------------------------
  const handleRejected = useCallback((rejections: FileRejection[]) => {
    const tooMany = rejections.find(
      (r) => r.errors[0].code === "too-many-files"
    );
    const tooBig = rejections.find(
      (r) => r.errors[0].code === "file-too-large"
    );

    if (tooMany) toast.error("Troppi file");
    if (tooBig) toast.error("File troppo grande");
  }, []);

  return {
    files,
    handleFiles,
    handleRejected,
    removeFile,
  };
}
