import React, { useState, useEffect } from "react";
import { postData } from "../../helpers/postdata";

const DynamicImage = ({ remixId }) => {
  // Use the remixId prop to filter the postData
  const images = postData
    .filter((post) => post.remixid === remixId)
    .map((post) => post.src);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change the image every 3 seconds

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, [images.length]);

  if (images.length === 0) {
    return <p>No images available for this category.</p>;
  }

  return (
    <div>
      <img
        className="rounded-[8px] fade-in h-[370px] w-[370px] object-cover"
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        key={currentIndex}
      />
    </div>
  );
};

export default DynamicImage;
