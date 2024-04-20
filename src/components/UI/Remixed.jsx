import React from "react";
import { postData } from "../../helpers/postdata";

// Define a component for the repeating items
const ImageWithOptionalSVG = ({ src, shouldRenderSVG }) => (
  <>
    <img
      className="w-[104px] h-[86px] rounded-[4px] flex-shrink-0"
      src={src}
      alt=""
      loading="lazy"
    />
    {shouldRenderSVG && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="flex-shrink-0"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.67188 2.96191C2.67188 2.85417 2.71468 2.75084 2.79086 2.67465C2.86705 2.59847 2.97038 2.55566 3.07812 2.55566H3.48438C5.2735 2.55566 6.59381 3.56316 7.4445 4.52029C7.84263 4.96879 8.14731 5.41566 8.35938 5.76504C8.57062 5.41566 8.87613 4.96879 9.27425 4.52029C10.1249 3.56316 11.4453 2.55566 13.2344 2.55566V3.36816C11.7735 3.36816 10.6563 4.18879 9.882 5.05979C9.46332 5.53402 9.10373 6.0573 8.81113 6.61816C9.10348 7.17898 9.46279 7.70227 9.88119 8.17654C10.6571 9.04754 11.7751 9.86816 13.2344 9.86816V10.6807C11.4453 10.6807 10.1249 9.67316 9.27425 8.71604C8.9326 8.32938 8.62641 7.91279 8.35938 7.47129C8.14813 7.82066 7.84263 8.26754 7.4445 8.71604C6.59381 9.67316 5.2735 10.6807 3.48438 10.6807H3.07812C2.97038 10.6807 2.86705 10.6379 2.79086 10.5617C2.71468 10.4855 2.67188 10.3822 2.67188 10.2744C2.67188 10.1667 2.71468 10.0633 2.79086 9.98715C2.86705 9.91096 2.97038 9.86816 3.07812 9.86816H3.48438C4.94525 9.86816 6.06244 9.04754 6.83675 8.17654C7.25543 7.70231 7.61502 7.17903 7.90762 6.61816C7.61527 6.05734 7.25596 5.53406 6.83756 5.05979C6.06163 4.18879 4.94362 3.36816 3.48438 3.36816H3.07812C2.97038 3.36816 2.86705 3.32536 2.79086 3.24918C2.71468 3.17299 2.67188 3.06966 2.67188 2.96191Z"
          fill="black"
        />
      </svg>
    )}
  </>
);

const Remixed = ({ remixId, currentPostId }) => {
  // Filter postData to get images for the given remixId
  const images = postData
    .filter((post) => post.remixid === remixId && post.id !== currentPostId)
    .map((post) => post.src);

  return (
    <div className="flex flex-row overflow-scroll hide-scrollbar my-[16px] mx-[10px] items-center">
      {images.map((src, index) => (
        <ImageWithOptionalSVG
          key={index}
          src={src}
          shouldRenderSVG={index < images.length - 1} // render SVG if not the last item
        />
      ))}
    </div>
  );
};

export default Remixed;
