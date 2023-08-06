import { useEffect, useState } from "react";

import { timeTextProps, timeText } from "@/shared/types";
import { formatDuration } from "@/helpers/archive-ai-files-functions";

const TimeText = ({ timeText, paused, audioRef }: timeTextProps) => {
  const [timeTextArray, setTimeTextArray] = useState<timeText[]>(timeText);

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

        const updateArray = timeTextArray.map((t) => {
          if (t.from <= currentAudioTime && t.to >= currentAudioTime) {
            return { ...t, active: true };
          } else {
            return { ...t, active: false };
          }
        });
        setTimeTextArray(updateArray);
      };

      const intervalId = setInterval(updateCurrentTime, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [paused, timeTextArray, audioRef]);

  return (
    <div className="time-text-container">
      {timeTextArray.map((t) => {
        return (
          <div
            key={t.id}
            className={isEven(t.id) ? "time-text" : "time-text odd"}
            style={t.active ? { color: "#118ad3" } : {}}
            id={t.active ? "active" : "not-active"}
          >
            <span className="time-to">{formatDuration(t.to)}</span>
            <span className="time-from">{formatDuration(t.from)}</span>
            <span className="text">{t.text}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TimeText;
