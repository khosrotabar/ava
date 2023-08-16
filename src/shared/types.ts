import { Dispatch, MutableRefObject } from "react";

export interface data {
  count: number | undefined;
  next: null | string;
  previous: null | string;
  results: dataResults[] | undefined;
}

export interface dataResults {
  id: number;
  request_type: string;
  duration: string;
  date: string;
  request_data: {
    language: string;
    media_url?: string;
    media_urls: string[] | string;
  };
  isActive?: boolean;
}

export interface text {
  start: string;
  end: string;
  text: string;
  active?: boolean;
}

export type homeLangProps = {
  isFetch: boolean;
  menuOpen: boolean;
  langSelect: string;
  setMenuOpen: Dispatch<boolean>;
  setLangSelect: Dispatch<string>;
};

export type homeAiContentProps = {
  activetab: number;
};

export type aiOutputProps = {
  currentTab: string;
  text: text[];
  lang: string;
  paused: boolean;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  duration: number;
  setPaused: Dispatch<boolean>;
  setIsFetch?: Dispatch<boolean>;
};

export type aiOutputPlayerProps = {
  currentTab: string;
  paused: boolean;
  duration: number | undefined;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  setPaused: Dispatch<boolean>;
};

export type simpleTextProps = {
  text: text[];
  paused: boolean;
  lang: string;
  audioRef?: MutableRefObject<HTMLAudioElement | null>;
};

export type timeTextProps = {
  text: text[];
  paused: boolean;
  lang: string;
  audioRef?: MutableRefObject<HTMLAudioElement | null>;
};

export type aiFileProps = {
  item: dataResults;
  files: data | null;
  setFiles: Dispatch<data>;
  onItemClick: (itemId: number) => void;
};

export type topbarProps = {
  isResp?: boolean;
  setIsResp?: Dispatch<boolean>;
};
