import React, { useEffect, useRef } from "react";
import Page from "../components/Layout/Page";
import CreateCard from "../components/UI/CreateCard";

const create = () => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      // Calculate the position to scroll to: (total width of the cards - container width) / 2
      const scrollPosition =
        (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2;
      scrollContainer.scrollLeft = scrollPosition;
    }
  }, []);

  return (
    <Page back="/" color="#CAE0FF">
      <div
        ref={scrollContainerRef}
        className="flex hide-scrollbar gap-[20px] px-[25px] overflow-x-scroll mt-[50px] "
      >
        <CreateCard
          name="Text to Tunesss"
          description="this model generates tunes in real time, based on the genre you input with the lyrics you input"
          imageUrl="/images/create/create1.svg"
          type="audio"
        />
        <CreateCard
          name="Text to Potraits"
          description="create great portrait with this model, it’s awesome. A portrait of Mahatma Gandhi in anime style?"
          imageUrl="/images/create/create2.svg"
          type="image"
        />
        <CreateCard
          name="Text to Joke"
          description="prompt the model to create jokes by famous celebrities? A joke by Steve Jobs during his final speech? "
          imageUrl="/images/create/create3.svg"
          type="image"
        />
        <CreateCard
          name="Text to Landscape"
          description="prompt the model to create great landscapes, put funny characters on it too."
          imageUrl="/images/create/create4.svg"
          type="image"
        />
        <CreateCard
          name="Create Memes"
          description="prompt the model to create memes using AI, make your audience laugh."
          imageUrl="/images/create/create5.svg"
          type="image"
        />
      </div>
    </Page>
  );
};

export default create;
