import type { Dispatch } from "react";

export type linkHandleProps = {
  linkValue: string;
  notify: (value: string) => void;
  setAudioDuration: Dispatch<number>;
  setIsFetch: Dispatch<boolean>;
};
