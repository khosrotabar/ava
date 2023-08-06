import type { Dispatch, MutableRefObject } from "react";

export type handleStartRecordingProps = {
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>;
  setAudioUrl: Dispatch<string>;
  setDuration: Dispatch<number>;
  setIsRecording: Dispatch<boolean>;
};

export type handleStopRecordingProps = {
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>;
  setIsRecording: Dispatch<boolean>;
  setIsFetch: Dispatch<boolean>;
};
