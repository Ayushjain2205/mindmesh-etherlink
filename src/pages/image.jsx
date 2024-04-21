import React, { useState } from "react";
import Page from "../components/Layout/Page";
import lighthouse from "@lighthouse-web3/sdk";

const fetchImageFromDalle = async (userPrompt) => {
  const basePrompt =
    "You are a New emoji creating wizard. Create a cool looking emoji for ";
  const fullPrompt = `${basePrompt} ${userPrompt}`;

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ prompt: fullPrompt }),
  });

  const data = await response.json();
  return data;
};

const uploadFileToLighthouse = async (file) => {
  const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;
  const progressCallback = (progressData) => {
    const percentageDone =
      100 - (progressData.total / progressData.uploaded).toFixed(2);
    console.log(`Upload progress: ${percentageDone}%`);
  };

  const output = await lighthouse.upload(
    file,
    apiKey,
    false,
    null,
    progressCallback
  );
  console.log("File Status:", output);
  if (output && output.data && output.data.Hash) {
    console.log(
      `Visit at https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`
    );
  }
};

const ImagePage = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateClick = async () => {
    setIsLoading(true);
    const result = await fetchImageFromDalle(prompt);
    setIsLoading(false);
    if (result && result.data && result.data[0] && result.data[0].url) {
      const imageUrl = result.data[0].url;
      setImage(imageUrl);

      // Fetch the image as a Blob, then upload
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const file = new File([imageBlob], "generated-image.png", {
        type: "image/png",
      });
      await uploadFileToLighthouse(file);
    } else {
      console.log("Error: No image returned from DALL·E API");
    }
  };

  return (
    <Page>
      <div className="flex flex-col items-center justify-center p-4">
        <textarea
          className="textarea textarea-bordered w-full max-w-lg p-2"
          placeholder="Enter your prompt here"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <button
          className="btn btn-primary mt-4"
          onClick={handleGenerateClick}
          disabled={isLoading}
        >
          Generate and Upload
        </button>
        {isLoading && <div className="text-lg mt-4">Loading...</div>}
        {image && (
          <div className="mt-4">
            <img
              src={image}
              alt="Generated from DALL·E"
              className="max-w-full max-h-96"
            />
          </div>
        )}
      </div>
    </Page>
  );
};

export default ImagePage;
