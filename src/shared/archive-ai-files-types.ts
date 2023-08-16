import { Dispatch, MutableRefObject } from "react";

import { data, dataResults } from "@/shared/types";

export type handleTooltipProps = {
  setOpen: Dispatch<boolean>;
};

export type deleteHandlerProps = {
  files: data | null;
  setFiles: Dispatch<data>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  item: dataResults;
};

export type downloadHandlerProps = {
  audioUrl?: string | null;
  audioRef?: MutableRefObject<HTMLAudioElement | null>;
};

export type restartHandlerProps = {
  setIsFetch: Dispatch<boolean> | undefined;
  setPaused: Dispatch<boolean>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
};
