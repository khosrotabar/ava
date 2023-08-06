import { useState } from "react";

import HomeMain from "@/components/home-main/HomeMain";
import Rightbar from "@/components/rightbar/Rightbar";
import Topbar from "@/components/topbar/Topbar";

const Home = () => {
  const [isResp, setIsResp] = useState<boolean>(false);

  return (
    <div className="home">
      <Topbar isResp={isResp} setIsResp={setIsResp} />
      <HomeMain />
      <Rightbar isResp={isResp} setIsResp={setIsResp} />
    </div>
  );
};

export default Home;
