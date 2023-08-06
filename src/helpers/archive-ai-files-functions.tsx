import {
  handleTooltipProps,
  deleteHandlerProps,
  downloadHandlerProps,
  restartHandlerProps,
} from "@/shared/archive-ai-files-types";

// reastart function
export const restartHandler = ({
  setIsFetch,
  setPaused,
  audioRef,
}: restartHandlerProps) => {
  setIsFetch && setIsFetch(false);
  setPaused(true);
  audioRef.current?.pause();
};

// format audio duration
export const formatDuration = (value: number) => {
  const hour = Math.floor(value / 3600);
  const minute = Math.floor((value - hour * 3600) / 60);
  const secondLeft = value - (minute * 60 + hour * 3600);
  return `${hour !== 0 ? hour + ":" : ""}${
    minute === 0 ? "0" + minute : minute
  }:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
};

// copy text handler
export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

// copy tooltip handlers
export const tooltipCloseHandler = ({ setOpen }: handleTooltipProps) => {
  setOpen(false);
};
export const tooltipOpenHandler = ({ setOpen }: handleTooltipProps) => {
  setOpen(true);
};

// delete file handler
export const deleteHandler = ({
  files,
  setFiles,
  audioRef,
  item,
}: deleteHandlerProps) => {
  const filesUpdate = files.filter((file) => file.id !== item.id);
  setFiles(filesUpdate);
  audioRef.current?.pause();
};

// download audio handler
export const downloadHandler = ({ item, audioRef }: downloadHandlerProps) => {
  const link = document.createElement("a");
  link.href = item?.audio || audioRef?.current?.src || "";
  link.download = "audio.mp3";
  link.click();
};
