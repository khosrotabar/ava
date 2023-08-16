import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import AiOutput from "@/components/ai-output/AiOutput";
import HomeLang from "@/components/home-main/home-lang/HomeLang";
import { linkIcon } from "@/utilities/svg/svg";
import { linkHandler } from "@/helpers/home-link-functions";
import { text } from "@/shared/types";
import Loader from "@/components/loader/Loader";
import { linkApi } from "@/api/AsyncAPI";

const HomeAiLink = () => {
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const [startFetch, setStartFetch] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [langSelect, setLangSelect] = useState<string>("fa");
  const [paused, setPaused] = useState<boolean>(true);
  const [linkValue, setLinkValue] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [text, setText] = useState<text[]>([
    { start: "0:00:00", end: "0:00:00", text: "" },
  ]);
  const notify = (value: string) => toast.error(value);

  // link handle click
  const linkHandleClick = () => {
    linkHandler({ linkValue, notify });

    linkValue !== "" &&
      linkApi({
        setAudioDuration,
        setStartFetch,
        setIsFetch,
        notify,
        linkValue,
        setText,
        langSelect,
      });
  };

  return (
    <div className='home-ai-link'>
      {/* dummy voice - it will be with fetch / context */}
      <audio
        id='audio'
        preload='none'
        ref={audioRef}
        style={{ display: "none" }} // for challenge - 1
        onContextMenu={() => false}
        onEnded={() => setPaused(true)}
        hidden
        src={linkValue}></audio>
      {/* seperate from dummy voice */}
      {isFetch ? (
        // home ai content output - after fetch from server
        <div className='home-ai-link-fetch'>
          <AiOutput
            setPaused={setPaused}
            paused={paused}
            audioRef={audioRef && audioRef}
            text={text}
            currentTab={"link"}
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
          className='home-ai-link-prefetch'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}>
          <div className='ha-link-container'>
            <div className='ha-link-icon-container' onClick={linkHandleClick}>
              {/* link icon */}
              {linkIcon}
            </div>
            <input
              type='text'
              placeholder='example.com/sample.mp3'
              className='ha-link-input'
              value={linkValue}
              onChange={(event) => setLinkValue(event.target.value)}
            />
          </div>
          <span className='ha-link-text'>
            نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد و دکمه را فشار
            دهید
          </span>
          <div id='loader'>
            <span id='progress'></span>
          </div>
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

export default HomeAiLink;
