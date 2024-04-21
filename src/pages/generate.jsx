import React, { useState, useCallback } from "react";
import Page from "../components/Layout/Page";
import { toast } from "react-hot-toast";
import Link from "next/link";

const Generate = () => {
  const [prompt, setPrompt] = useState(""); // State to hold the user's input
  const [images, setImages] = useState([]); // State to hold the generated image URLs
  const [generated, setGenerated] = useState(false); // State to indicate if images have been generated
  const [isLoading, setIsLoading] = useState(false); // State to indicate loading status

  const fetchImageFromDalle = useCallback(async () => {
    if (!prompt.trim()) {
      toast.error("Prompt cannot be empty");
      return;
    } // Check for non-empty prompt

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // Ensure correct API key
          },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await response.json();
      if (data && data.data && data.data.length > 0) {
        setImages((prevImages) => [data.data[0].url]);
        setGenerated(true);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setIsLoading(false);
      setPrompt(""); // Clear prompt after fetching
    }
  }, [prompt]);

  const handleRedo = () => {
    setImages([]); // Clear all generated images
    setPrompt(""); // Clear the prompt
    setGenerated(false);
  };

  return (
    <Page back="/create">
      <div className="relative flex flex-col p-[10px] mt-[20px] mb-[60px]">
        <p className="text-secondary font-[500] text-[20px]">
          REAL TIME VISUALS
        </p>
        <p className="text-secondary text-[12px] leading-[20px] mt-[12px]">
          Users comment a word, and this model generates that image in real
          time.
        </p>

        <div className="flex flex-col justify-center mt-[12px] w-[370px] h-[335px] border-[1px] border-[#4F5170] rounded-[8px]">
          {images.length > 0 ? (
            <div className="">
              <img
                src={images[0]}
                alt="Generated"
                className="w-[370px] h-[335px] rounded-[8px]"
              />
            </div>
          ) : (
            <p className="text-center  text-[#4F5170] text-[14px]">
              {isLoading ? "Generating..." : "Your creation appears here"}
            </p>
          )}
        </div>

        <div className="flex-none mt-[30px]">
          <div className="flex flex-row items-center pr-[12px] rounded-[6px] border border-[#4F5170]  bg-transparent w-full h-[40px]">
            <input
              className="bg-transparent w-full p-[18px] focus:outline-none text-[12px]"
              type="text"
              placeholder="Enter your prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            {!generated ? (
              <button
                onClick={fetchImageFromDalle} // Use a button for accessibility
                disabled={isLoading} // Disable while loading
                className="flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.401 3.42835C7.47067 3.3585 7.55344 3.30309 7.64455 3.26528C7.73567 3.22747 7.83335 3.20801 7.932 3.20801C8.03066 3.20801 8.12834 3.22747 8.21946 3.26528C8.31057 3.30309 8.39334 3.3585 8.463 3.42835L17.463 12.4283C17.5328 12.498 17.5883 12.5808 17.6261 12.6719C17.6639 12.763 17.6833 12.8607 17.6833 12.9593C17.6833 13.058 17.6639 13.1557 17.6261 13.2468C17.5883 13.3379 17.5328 13.4207 17.463 13.4903L8.463 22.4903C8.32217 22.6312 8.13117 22.7103 7.932 22.7103C7.73284 22.7103 7.54183 22.6312 7.401 22.4903C7.26017 22.3495 7.18106 22.1585 7.18106 21.9593C7.18106 21.7602 7.26017 21.5692 7.401 21.4283L15.8715 12.9593L7.401 4.49035C7.33116 4.42068 7.27574 4.33792 7.23794 4.2468C7.20013 4.15568 7.18066 4.058 7.18066 3.95935C7.18066 3.8607 7.20013 3.76302 7.23794 3.6719C7.27574 3.58078 7.33116 3.49802 7.401 3.42835Z"
                    fill="black"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="flex items-center justify-center"
                onClick={handleRedo}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.9996 4.5C13.6206 4.50062 15.1977 5.02639 16.4948 5.99856C17.7919 6.97072 18.7391 8.33696 19.1945 9.89262C19.65 11.4483 19.5892 13.1096 19.0213 14.6278C18.4533 16.1461 17.4088 17.4394 16.0441 18.3142C14.6794 19.1889 13.0681 19.598 11.4514 19.4801C9.83472 19.3623 8.29973 18.7238 7.07635 17.6604C5.85297 16.597 5.00705 15.1658 4.66529 13.5813C4.32353 11.9968 4.50432 10.3442 5.18058 8.871C5.25419 8.69189 5.25567 8.49126 5.18471 8.31108C5.11376 8.13091 4.97586 7.98516 4.79989 7.90435C4.62392 7.82353 4.42351 7.81391 4.2406 7.8775C4.0577 7.94109 3.90647 8.07295 3.81858 8.2455C3.0071 10.0134 2.79024 11.9966 3.20048 13.8981C3.61072 15.7996 4.62599 17.5169 6.0942 18.793C7.56241 20.069 9.40453 20.835 11.3446 20.9762C13.2847 21.1175 15.2183 20.6263 16.8559 19.5764C18.4934 18.5264 19.7467 16.9742 20.428 15.1522C21.1093 13.3301 21.1819 11.3364 20.635 9.46967C20.0881 7.6029 18.9511 5.96357 17.3944 4.79723C15.8376 3.63089 13.9448 3.00033 11.9996 3V4.5Z"
                    fill="black"
                  />
                  <path
                    d="M11.9998 6.69864V0.800641C11.9998 0.729386 11.9794 0.659613 11.9412 0.599493C11.9029 0.539372 11.8484 0.491394 11.7838 0.461175C11.7193 0.430956 11.6475 0.419747 11.5768 0.428862C11.5062 0.437977 11.4395 0.467037 11.3848 0.512641L7.84479 3.46164C7.80259 3.49683 7.76864 3.54087 7.74534 3.59064C7.72204 3.64041 7.70996 3.69469 7.70996 3.74964C7.70996 3.80459 7.72204 3.85887 7.74534 3.90864C7.76864 3.95841 7.80259 4.00245 7.84479 4.03764L11.3848 6.98664C11.4395 7.03224 11.5062 7.06131 11.5768 7.07042C11.6475 7.07953 11.7193 7.06833 11.7838 7.03811C11.8484 7.00789 11.9029 6.95991 11.9412 6.89979C11.9794 6.83967 11.9998 6.7699 11.9998 6.69864Z"
                    fill="black"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="fixed bg-white bottom-0 flex w-full justify-between p-[10px]">
          <Link href="/">
            <button
              className="bg-primary text-black font-[500] h-[45px] w-full rounded-[8px] mr-[10px] -ml-[10px]"
              // onClick={fetchImageFromDalle}
            >
              Post
            </button>
          </Link>
        </div>
      </div>
    </Page>
  );
};

export default Generate;
