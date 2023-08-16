import { useState } from "react";

import ArchiveMain from "@/components/archive-main/ArchiveMain";
import Rightbar from "@/components/rightbar/Rightbar";
import Topbar from "@/components/topbar/Topbar";

const Archive = () => {
  const [isResp, setIsResp] = useState<boolean>(false);

  return (
    <div className='archive'>
      <Topbar isResp={isResp} setIsResp={setIsResp} />
      <ArchiveMain />
      <Rightbar isResp={isResp} setIsResp={setIsResp} />
    </div>
  );
};

export default Archive;
