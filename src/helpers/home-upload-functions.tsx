import { handleFileChangeProps } from "@/shared/upload-functions-types";

// file handler
export const fileHandler = ({
  event,
  setFile,
  setFilePath,
}: handleFileChangeProps) => {
  setFile(event.target.files?.[0]);
  const files = event.target.files;
  if (files && files.length > 0) {
    const filePath = URL.createObjectURL(files[0]);
    setFilePath(filePath);
  }
};
