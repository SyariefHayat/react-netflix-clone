import React from "react";
import ReactPlayer from "react-player";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";

import BrowseLayout from "@layouts/BrowseLayout";
import { isOpenModalAtom } from "@/jotai/atoms";
import { useAtom } from "jotai";

const Watch = () => {
  const { id } = useParams();
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);
  const navigate = useNavigate();

  const handleLeftClick = () => {
    setIsOpenModal(false);
    navigate("/browse");
  };

  return (
    <BrowseLayout>
      <div
        className="absolute top-20 left-6 hover:text-white transition-all cursor-pointer"
        onClick={handleLeftClick}
      >
        <GoChevronLeft size={44} />
      </div>
      <ReactPlayer
        url={"https://www.youtube.com/watch?v=" + id}
        width={"100%"}
        height={"100vh"}
        playing={true}
        muted={false}
        controls={false}
      />
    </BrowseLayout>
  );
};

export default Watch;
