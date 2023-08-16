import { useEffect, useState } from "react";

import { timeTextProps, text } from "@/shared/types";
import {
  convertSecond,
  formatDurationTextTime,
} from "@/helpers/archive-ai-files-functions";

const TimeText = ({ text, lang, paused, audioRef }: timeTextProps) => {
  const [textArray, setTextArray] = useState<text[]>(text);

  // detect number odd and even
  const isEven = (num: number) => num % 2 === 0;

  // scroll to active time
  const scrollToElement = (elementId: string) => {
    const element = document.querySelector(`#${elementId}`);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  // handle active time for text
  useEffect(() => {
    if (!paused) {
      scrollToElement("active");
      const audioElement = document.getElementById("audio") as HTMLAudioElement;

      const updateCurrentTime = () => {
        const currentAudioRef = audioRef?.current;
        const currentAudioTime = currentAudioRef
          ? currentAudioRef.currentTime
          : audioElement.currentTime;

        const updateArray = textArray.map((t) => {
          if (
            convertSecond(t.start) <= currentAudioTime &&
            convertSecond(t.end) >= currentAudioTime
          ) {
            return { ...t, active: true };
          } else {
            return { ...t, active: false };
          }
        });
        setTextArray(updateArray);
      };

      const intervalId = setInterval(updateCurrentTime, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [paused, textArray, audioRef]);

  return (
    <div className='time-text-container'>
      {textArray.map((t, index) => {
        return (
          <div
            key={index}
            className={isEven(index + 1) ? "time-text" : "time-text odd"}
            style={t.active ? { color: "#118ad3" } : {}}
            id={t.active ? "active" : "not-active"}>
            <span className='time-to'>{formatDurationTextTime(t.end)}</span>
            <span className='time-from'>{formatDurationTextTime(t.start)}</span>
            <span className={`text ${lang === "en" && "change-text"}`}>
              {t.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TimeText;
