import type { ChangeEvent, Dispatch } from "react";

export type handleFileChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
  setFile: Dispatch<File | undefined>;
  setFilePath: Dispatch<string | null>;
};
