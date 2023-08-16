import type { Dispatch, MutableRefObject } from "react";

export type handleStartRecordingProps = {
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>;
  setAudioUrl: Dispatch<string>;
  setFile: Dispatch<Blob | undefined>;
};

export type handleStopRecordingProps = {
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>;
};
