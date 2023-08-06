import { Dispatch, MutableRefObject } from "react";

export interface timeText {
  id: number;
  text: string;
  from: number;
  to: number;
  active?: boolean;
}

export interface data {
  id: number;
  name: string;
  createdAt: string;
  voiceType: string;
  sendType: string;
  duration: number; // seconds
  downloadLink: string;
  wordLink: string;
  text: string;
  timeText: timeText[];
  size: number;
  audio: string;
  isActive?: boolean;
  lang: string;
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
  text: string;
  timeText: timeText[];
  paused: boolean;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  duration?: number;
  lang: string;
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
  text: string;
  lang: string;
};

export type timeTextProps = {
  timeText: timeText[];
  paused: boolean;
  audioRef?: MutableRefObject<HTMLAudioElement | null>;
};

export type aiFileProps = {
  item: data;
  files: data[];
  setFiles: Dispatch<data[]>;
  onItemClick: (itemId: number) => void;
};

export type topbarProps = {
  isResp?: boolean;
  setIsResp?: Dispatch<boolean>;
};
