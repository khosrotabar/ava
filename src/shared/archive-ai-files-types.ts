import { Dispatch, MutableRefObject } from "react";

import { data } from "@/shared/types";

export type handleTooltipProps = {
  setOpen: Dispatch<boolean>;
};

export type deleteHandlerProps = {
  files: data[];
  setFiles: Dispatch<data[]>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  item: data;
};

export type downloadHandlerProps = {
  item?: data;
  audioRef?: MutableRefObject<HTMLAudioElement | null>;
};

export type restartHandlerProps = {
  setIsFetch: Dispatch<boolean> | undefined;
  setPaused: Dispatch<boolean>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
};
