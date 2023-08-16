import { useEffect, useState } from "react";

import { simpleTextProps, text } from "@/shared/types";
import { convertSecond } from "@/helpers/archive-ai-files-functions";

const SimpleText = ({ text, lang, paused, audioRef }: simpleTextProps) => {
  const [textArray, setTextArray] = useState<text[]>(text);

  // scroll to active time
  const scrollToElement = (elementId: string) => {
    const element = document.querySelector(`#${elementId}`);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  // set initioal textArray - fix error in archive for first load of text
  useEffect(() => {
    setTextArray(text);
  }, [text]);

  // handle active time for text
  useEffect(() => {
    if (!paused) {
      scrollToElement("active");
      const audioElement = document.getElementById("audio") as HTMLAudioElement;

      const updateCurrentTime = () => {
        const currentAudioRef = audioRef?.current;
        const currentAudioTime = currentAudioRef
          ? currentAudioRef.currentTime
          : audioElement?.currentTime;

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
    <div
      className={`simple-text-container ${
        lang === "en" && "change-simple-text-container"
      }`}>
      {textArray.map((t, index) => {
        return (
          <span
            key={index}
            className='simple-text'
            style={t.active ? { color: "#00BA9F" } : {}}
            id={t.active ? "active" : "not-active"}>
            {t.text}{" "}
          </span>
        );
      })}
    </div>
  );
};
export default SimpleText;
