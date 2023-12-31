import { linkHandleProps } from "@/shared/link-functions-types";

// link input validate
const checkString = (str: string): boolean => {
  const extensions = [".mp3", ".mpeg", ".mp4", ".wave"];
  return extensions.some((ext) => str.includes(ext));
};

// dev mode - link handler - challenge 1
export const linkHandler = ({ linkValue, notify }: linkHandleProps) => {
  if (linkValue === "") {
    notify("!لینک نباید خالی باشد");
  } else if (!checkString(linkValue)) {
    notify("!فرمت لینک وارد شده صحیح نیست");
  }
};
