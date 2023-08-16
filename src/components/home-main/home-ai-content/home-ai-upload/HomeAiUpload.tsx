import { useState, useRef, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import AiOutput from "@/components/ai-output/AiOutput";
import HomeLang from "@/components/home-main/home-lang/HomeLang";
import { uploadIcon } from "@/utilities/svg/svg";
import { fileHandler } from "@/helpers/home-upload-functions";
import Loader from "@/components/loader/Loader";
import { text } from "@/shared/types";
import { uploadApi } from "@/api/AsyncAPI";

const HomeAiUpload = () => {
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const [startFetch, setStartFetch] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [langSelect, setLangSelect] = useState<string>("fa");
  const [paused, setPaused] = useState<boolean>(true);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [filePath, setFilePath] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [text, setText] = useState<text[]>([
    { start: "0:00:00", end: "0:00:00", text: "" },
  ]);
  const notify = (value: string) => toast.error(value);

  // run upload api when file selected - upload api
  useEffect(() => {
    if (file) {
      uploadApi({
        setAudioDuration,
        setStartFetch,
        setIsFetch,
        setText,
        notify,
        langSelect,
        file,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  // file handler
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    fileHandler({ event, setFile, setFilePath });
  };

  return (
    <div className='home-ai-upload'>
      {/* dummy voice - it will be with fetch / context */}
      <audio
        id='audio'
        preload='none'
        ref={audioRef}
        style={{ display: "none" }} // for challenge - 1
        onContextMenu={() => false}
        onEnded={() => setPaused(true)}
        hidden
        src={filePath ? filePath : ""}></audio>
      {/* seperate from dummy voice */}
      {isFetch ? (
        // home ai content output - after fetch from server
        <div className='home-ai-upload-fetch'>
          <AiOutput
            setPaused={setPaused}
            paused={paused}
            audioRef={audioRef && audioRef}
            text={text}
            currentTab={"upload"}
            duration={audioDuration}
            lang={langSelect}
            setIsFetch={setIsFetch}
          />
        </div>
      ) : // home ai content output - before fetch from server
      startFetch ? (
        <Loader />
      ) : (
        <motion.div
          className='home-ai-upload-prefetch'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}>
          {/* upload file input/label */}
          <label htmlFor='upload-file'>
            <div className='ha-upload-icon-container'>
              {/* upload icon */}
              {uploadIcon}
            </div>
            <input
              id='upload-file'
              type='file'
              name='upload-file'
              accept='.mpeg,.mp3,.wave,.mp4'
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>
          <span className='ha-upload-text'>
            برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید متن پیاده
            شده آن، در اینجا ظاهر می شود
          </span>
        </motion.div>
      )}
      {/* home bottom - language select */}
      <HomeLang
        isFetch={isFetch}
        menuOpen={menuOpen}
        langSelect={langSelect}
        setLangSelect={setLangSelect}
        setMenuOpen={setMenuOpen}
      />
    </div>
  );
};

export default HomeAiUpload;
