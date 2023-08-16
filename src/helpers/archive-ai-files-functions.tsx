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

// format createdAt date
export const convertDatetimeToDate = (datetime: string): string => {
  const dateObj = new Date(datetime);
  const year = dateObj.getUTCFullYear() - 621;
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
};

// format audio duration - string mode
export const formatDurationTextTime = (time: string) => {
  const timeComponents = time.split(":");
  const hours = parseInt(timeComponents[0]);
  const minutes = parseInt(timeComponents[1]);
  const seconds = parseInt(timeComponents[2]);

  let convertedTime: string;
  if (hours === 0) {
    convertedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    convertedTime = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return convertedTime;
};

// covert string time to seconds
export const convertSecond = (time: string) => {
  const timeComponents = time.split(":");
  const hours = parseInt(timeComponents[0]);
  const minutes = parseInt(timeComponents[1]);
  const seconds = parseInt(timeComponents[2]);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  return totalSeconds;
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
  const filesUpdate = {
    ...files!,
    results: files?.results?.filter((file) => file.id !== item.id),
  };

  setFiles(filesUpdate);
  audioRef.current?.pause();
};

// download audio handler
export const downloadHandler = ({
  audioUrl,
  audioRef,
}: downloadHandlerProps) => {
  const link = document.createElement("a");
  link.href = audioUrl || audioRef?.current?.src || "";
  link.download = "audio.mp3";
  link.click();
};
