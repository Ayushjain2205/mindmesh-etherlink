import React from "react";

const Remixed = () => {
  return (
    <div className="flex flex-col gap-[20px] mt-[16px]">
      <div className="flex flex-row gap-[15px] pl-[34px] items-start">
        <img src="/icons/remixed.svg" alt="" />
        <img
          className="w-[280px] rounded-[8px]"
          src="https://picsum.photos/280"
          alt=""
        />
      </div>
      <div className="flex flex-row gap-[15px] pl-[34px] items-start">
        <img className="opacity-0" src="/icons/remixed.svg" alt="" />
        <img
          className="w-[280px] rounded-[8px]"
          src="https://picsum.photos/280"
          alt=""
        />
      </div>
      <div className="flex flex-row gap-[15px] pl-[34px] items-start">
        <img className="opacity-0" src="/icons/remixed.svg" alt="" />
        <img
          className="w-[280px] rounded-[8px]"
          src="https://picsum.photos/280"
          alt=""
        />
      </div>
    </div>
  );
};

export default Remixed;
