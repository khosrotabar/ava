import { Dispatch, MutableRefObject } from "react";

import { data, dataResults, text } from "./types";

export type homeApiProps = {
  setAudioDuration: Dispatch<number>;
  setStartFetch: Dispatch<boolean>;
  setIsFetch: Dispatch<boolean>;
  setText: Dispatch<text[]>;
  notify: (value: string) => void;
  langSelect: string;
  linkValue?: string | undefined;
  file?: Blob | undefined;
};

export type listApiProps = {
  setData: Dispatch<data | null>;
};

export type deleteApiProps = {
  notify: (value: string) => void;
  itemId: number;
  files: data | null;
  setFiles: Dispatch<data>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  item: dataResults;
};

export type getFileApiProps = {
  itemId: number;
  setText: Dispatch<text[]>;
  setIsFetch: Dispatch<boolean>;
  notify: (value: string) => void;
};
