import axios from "axios";

// helpers function / shared types
import {
  convertSecond,
  deleteHandler,
} from "@/helpers/archive-ai-files-functions";
import {
  deleteApiProps,
  getFileApiProps,
  homeApiProps,
  listApiProps,
} from "@/shared/apiTypes";

// shared variables
const url = "https://harf.roshan-ai.ir/api/transcribe_files/";
const listUrl = "https://harf.roshan-ai.ir/api/requests";
const token = localStorage.getItem("Token");

// api for record
export const recordApi = async ({
  setAudioDuration,
  setStartFetch,
  setIsFetch,
  setText,
  notify,
  langSelect,
  file,
}: homeApiProps) => {
  try {
    setStartFetch(true);

    const formData = new FormData();
    formData.append("language", langSelect);
    file && formData.append("media", file, `recordType-record_name.mp3`);

    const res = await axios.post(url, formData, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": `multipart/form-data`,
      },
    });

    const results = res.data;

    setAudioDuration(convertSecond(results[0].duration));
    setText(results[0].segments);

    setStartFetch(false);
    setIsFetch(true);
  } catch (err) {
    console.log(err);
    setStartFetch(false);
    notify("خطایی در سرور رخ داده است! لطفا دوباره امتحان کنید");
  }
};

// api for upload
export const uploadApi = async ({
  setAudioDuration,
  setStartFetch,
  setIsFetch,
  setText,
  notify,
  langSelect,
  file,
}: homeApiProps) => {
  try {
    setStartFetch(true);

    const formData = new FormData();
    formData.append("language", langSelect);
    file && formData.append("media", file, `uploadType-${file.name}`);

    const res = await axios.post(url, formData, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": `multipart/form-data`,
      },
    });

    const results = res.data;

    setAudioDuration(convertSecond(results[0].duration));
    setText(results[0].segments);

    setStartFetch(false);
    setIsFetch(true);
  } catch (err) {
    console.log(err);
    setStartFetch(false);
    notify("خطایی در سرور رخ داده است! لطفا دوباره امتحان کنید");
  }
};

// api for link
export const linkApi = async ({
  setAudioDuration,
  setStartFetch,
  setIsFetch,
  notify,
  linkValue,
  setText,
  langSelect,
}: homeApiProps) => {
  try {
    setStartFetch(true);

    const mediaUrls: (string | undefined)[] = [linkValue];
    const language: string = langSelect;
    const payload = {
      media_urls: mediaUrls,
      language: language,
    };

    const res = await axios.post(url, payload, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    const results = res.data;

    setAudioDuration(convertSecond(results[0].duration));
    setText(results[0].segments);

    setStartFetch(false);
    setIsFetch(true);
  } catch (err) {
    console.log(err);
    setStartFetch(false);
    notify("خطایی در سرور رخ داده است! لطفا دوباره امتحان کنید");
  }
};

// api for list
export const listApi = async ({ setData }: listApiProps) => {
  try {
    const res = await axios.get(listUrl, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const results = res.data;

    setData(results);
  } catch (err) {
    console.log(err);
  }
};

// api for delete
export const deleteApi = async ({
  notify,
  itemId,
  files,
  setFiles,
  audioRef,
  item,
}: deleteApiProps) => {
  const url = `https://harf.roshan-ai.ir/api/get_request/${itemId}`;

  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    // delete realtime
    deleteHandler({
      files,
      setFiles,
      audioRef,
      item,
    });
  } catch (err) {
    console.log(err);
    notify("متاسفانه خطایی در سرور رخ داده است. لطفا دوباره امتحان کنید");
  }
};

// api for get single file
export const getFileApi = async ({
  itemId,
  setText,
  setIsFetch,
  notify,
}: getFileApiProps) => {
  const url = `https://harf.roshan-ai.ir/api/get_request/${itemId}`;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const results = res.data;

    setText(results.response_data[0].segments);
    setIsFetch(true);
  } catch (err) {
    console.log(err);
    notify("متاسفانه خطایی در سرور رخ داده است. لطفا دوباره امتحان کنید");
  }
};
