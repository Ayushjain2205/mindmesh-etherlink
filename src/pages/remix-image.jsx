import React, { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { postData } from "../helpers/postdata";

const remix = () => {
  const router = useRouter();
  const { id } = router.query;

  // Convert the id to a number and find the post
  const postToDisplay = postData.find((post) => post.id === parseInt(id, 10));

  const [prompt, setPrompt] = useState(""); // State to hold the user's input
  const [image, setImage] = useState(null); // State to hold the generated image URLs
  const [generated, setGenerated] = useState(false); // State to indicate if images have been generated
  const [isLoading, setIsLoading] = useState(false); // State to indicate loading status

  const fetchImageFromDalle = useCallback(async () => {
    if (!prompt.trim()) {
      toast.error("Prompt cannot be empty");
      return;
    }

    setIsLoading(true);
    // Append the fixed prompt text to the user's input before sending
    const fullPrompt =
      prompt +
      " 'Ice Cream Burger Delight': Imagine a savory beef burger where the patty is sandwiched not between regular buns, but between two thick slices of sweet, creamy vanilla ice cream. The contrasting temperatures and flavors of hot, juicy meat and cold, sweet ice cream create a perplexing yet intriguing taste experience, served with a side of crispy bacon for an added salty crunch.";

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // Ensure correct API key
          },
          body: JSON.stringify({ prompt: fullPrompt }), // Use the combined prompt
        }
      );

      const data = await response.json();
      if (data && data.data && data.data.length > 0) {
        setImage(data.data[0].url);
        setGenerated(true);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setIsLoading(false);
      // Do not clear prompt here if you want to keep user input visible
    }
  }, [prompt]);

  const handleRedo = () => {
    setImage(null); // Clear all generated images
    setPrompt(""); // Clear the prompt
    setGenerated(false);
  };

  if (!postToDisplay) {
    return <div>Loading post details...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full justify-between absolute top-0 z-50">
        <div className="flex flex-col items-center justify-center w-[40px] h-[40px] cursor-pointer">
          <Link href={`/post/${id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.9785 10.077C18.9785 9.9112 18.9127 9.75223 18.7955 9.63502C18.6782 9.51781 18.5193 9.45196 18.3535 9.45196H3.61227L7.54602 5.51946C7.66337 5.4021 7.72931 5.24293 7.72931 5.07696C7.7293 4.91099 7.66337 4.75182 7.54602 4.63446C7.42866 4.5171 7.26949 4.45117 7.10352 4.45117C6.93755 4.45117 6.77837 4.5171 6.66102 4.63446L1.66101 9.63446C1.60281 9.69252 1.55663 9.76149 1.52513 9.83742C1.49362 9.91335 1.4774 9.99475 1.4774 10.077C1.4774 10.1592 1.49362 10.2406 1.52513 10.3165C1.55663 10.3924 1.60281 10.4614 1.66101 10.5195L6.66102 15.5195C6.77837 15.6368 6.93755 15.7028 7.10352 15.7028C7.26949 15.7028 7.42866 15.6368 7.54602 15.5195C7.66337 15.4021 7.7293 15.2429 7.72931 15.077C7.72931 14.911 7.66337 14.7518 7.54602 14.6345L3.61227 10.702H18.3535C18.5193 10.702 18.6782 10.6361 18.7955 10.5189C18.9127 10.4017 18.9785 10.2427 18.9785 10.077Z"
                fill="#2A2A2A"
              />
            </svg>
          </Link>
        </div>

        {/* all icons top right */}
        <div className="flex flex-row gap-[15px] ml-[110px]">
          <div className="flex flex-col items-center justify-center w-[40px] h-[40px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M3.72297 16.9284L4.90172 13.4246H9.24297L10.423 16.9284H11.993L7.84297 5.26465H6.32047L2.16797 16.9284H3.72297ZM7.09797 7.02465L8.84297 12.2196H5.30547L7.05547 7.02465H7.09797ZM18.5305 15.8084H18.5742V16.9284H19.9842V10.7334C19.9842 8.8459 18.5917 7.80215 16.6767 7.80215C14.5067 7.80215 13.4392 8.94715 13.3442 10.5196H14.7292C14.8142 9.62215 15.473 9.03215 16.6255 9.03215C17.8392 9.03215 18.523 9.68215 18.523 10.8621V11.7759H16.1555C14.0967 11.7846 13.003 12.7759 13.003 14.3484C13.003 15.9971 14.1992 17.0734 15.9342 17.0734C17.2592 17.0734 18.0792 16.5359 18.5317 15.8096L18.5305 15.8084ZM16.3267 15.8521C15.3867 15.8521 14.5067 15.3559 14.5067 14.2971C14.5067 13.4846 15.0367 12.9034 16.2667 12.9034H18.523V13.9459C18.523 15.0659 17.583 15.8521 16.3267 15.8521Z"
                fill="black"
              />
            </svg>
          </div>

          <div className="flex flex-col items-center justify-center w-[40px] h-[40px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M18.9785 15.7236C18.9785 16.0552 18.8468 16.3731 18.6124 16.6075C18.378 16.8419 18.06 16.9736 17.7285 16.9736H2.72852C2.397 16.9736 2.07905 16.8419 1.84463 16.6075C1.61021 16.3731 1.47852 16.0552 1.47852 15.7236V8.22363C1.47852 7.89211 1.61021 7.57417 1.84463 7.33975C2.07905 7.10533 2.397 6.97363 2.72852 6.97363H4.19352C5.18756 6.97309 6.14072 6.57789 6.84352 5.87488L7.88102 4.83988C8.11477 4.60606 8.43164 4.47437 8.76227 4.47363H11.6923C12.0238 4.4737 12.3417 4.60545 12.576 4.83988L13.611 5.87488C13.9593 6.22328 14.3728 6.49963 14.8279 6.68816C15.2831 6.87669 15.7709 6.97369 16.2635 6.97363H17.7285C18.06 6.97363 18.378 7.10533 18.6124 7.33975C18.8468 7.57417 18.9785 7.89211 18.9785 8.22363V15.7236ZM2.72852 5.72363C2.06547 5.72363 1.42959 5.98702 0.960749 6.45587C0.491908 6.92471 0.228516 7.56059 0.228516 8.22363L0.228516 15.7236C0.228516 16.3867 0.491908 17.0226 0.960749 17.4914C1.42959 17.9602 2.06547 18.2236 2.72852 18.2236H17.7285C18.3916 18.2236 19.0274 17.9602 19.4963 17.4914C19.9651 17.0226 20.2285 16.3867 20.2285 15.7236V8.22363C20.2285 7.56059 19.9651 6.92471 19.4963 6.45587C19.0274 5.98702 18.3916 5.72363 17.7285 5.72363H16.2635C15.6005 5.72349 14.9647 5.46001 14.496 4.99113L13.461 3.95613C12.9923 3.48726 12.3565 3.22377 11.6935 3.22363H8.76352C8.10053 3.22377 7.46475 3.48726 6.99602 3.95613L5.96102 4.99113C5.49228 5.46001 4.8565 5.72349 4.19352 5.72363H2.72852Z"
                fill="black"
              />
              <path
                d="M10.2285 14.4736C9.39971 14.4736 8.60486 14.1444 8.01881 13.5583C7.43276 12.9723 7.10352 12.1774 7.10352 11.3486C7.10352 10.5198 7.43276 9.72498 8.01881 9.13892C8.60486 8.55287 9.39971 8.22363 10.2285 8.22363C11.0573 8.22363 11.8522 8.55287 12.4382 9.13892C13.0243 9.72498 13.3535 10.5198 13.3535 11.3486C13.3535 12.1774 13.0243 12.9723 12.4382 13.5583C11.8522 14.1444 11.0573 14.4736 10.2285 14.4736ZM10.2285 15.7236C11.3888 15.7236 12.5016 15.2627 13.3221 14.4422C14.1426 13.6218 14.6035 12.509 14.6035 11.3486C14.6035 10.1883 14.1426 9.07551 13.3221 8.25504C12.5016 7.43457 11.3888 6.97363 10.2285 6.97363C9.06819 6.97363 7.9554 7.43457 7.13492 8.25504C6.31445 9.07551 5.85352 10.1883 5.85352 11.3486C5.85352 12.509 6.31445 13.6218 7.13492 14.4422C7.9554 15.2627 9.06819 15.7236 10.2285 15.7236ZM3.97852 8.84863C3.97852 9.01439 3.91267 9.17336 3.79546 9.29057C3.67825 9.40778 3.51928 9.47363 3.35352 9.47363C3.18776 9.47363 3.02878 9.40778 2.91157 9.29057C2.79436 9.17336 2.72852 9.01439 2.72852 8.84863C2.72852 8.68287 2.79436 8.5239 2.91157 8.40669C3.02878 8.28948 3.18776 8.22363 3.35352 8.22363C3.51928 8.22363 3.67825 8.28948 3.79546 8.40669C3.91267 8.5239 3.97852 8.68287 3.97852 8.84863Z"
                fill="black"
              />
            </svg>
          </div>

          <div className="flex flex-col items-center justify-center w-[40px] h-[40px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                d="M3.72852 7.22363C3.86112 7.22363 3.9883 7.27631 4.08207 7.37008C4.17584 7.46385 4.22852 7.59102 4.22852 7.72363V8.72363C4.22852 9.7845 4.64994 10.8019 5.40009 11.5521C6.15023 12.3022 7.16765 12.7236 8.22852 12.7236C9.28938 12.7236 10.3068 12.3022 11.0569 11.5521C11.8071 10.8019 12.2285 9.7845 12.2285 8.72363V7.72363C12.2285 7.59102 12.2812 7.46385 12.375 7.37008C12.4687 7.27631 12.5959 7.22363 12.7285 7.22363C12.8611 7.22363 12.9883 7.27631 13.0821 7.37008C13.1758 7.46385 13.2285 7.59102 13.2285 7.72363V8.72363C13.2285 9.96316 12.7681 11.1585 11.9366 12.0778C11.1051 12.997 9.96183 13.5747 8.72852 13.6986V15.7236H11.7285C11.8611 15.7236 11.9883 15.7763 12.0821 15.8701C12.1758 15.9638 12.2285 16.091 12.2285 16.2236C12.2285 16.3562 12.1758 16.4834 12.0821 16.5772C11.9883 16.671 11.8611 16.7236 11.7285 16.7236H4.72852C4.59591 16.7236 4.46873 16.671 4.37496 16.5772C4.28119 16.4834 4.22852 16.3562 4.22852 16.2236C4.22852 16.091 4.28119 15.9638 4.37496 15.8701C4.46873 15.7763 4.59591 15.7236 4.72852 15.7236H7.72852V13.6986C6.4952 13.5747 5.35189 12.997 4.5204 12.0778C3.6889 11.1585 3.2285 9.96316 3.22852 8.72363V7.72363C3.22852 7.59102 3.28119 7.46385 3.37496 7.37008C3.46873 7.27631 3.59591 7.22363 3.72852 7.22363Z"
                fill="black"
              />
              <path
                d="M10.2285 8.72363C10.2285 9.25407 10.0178 9.76277 9.64273 10.1378C9.26766 10.5129 8.75895 10.7236 8.22852 10.7236C7.69808 10.7236 7.18937 10.5129 6.8143 10.1378C6.43923 9.76277 6.22852 9.25407 6.22852 8.72363V3.72363C6.22852 3.1932 6.43923 2.68449 6.8143 2.30942C7.18937 1.93435 7.69808 1.72363 8.22852 1.72363C8.75895 1.72363 9.26766 1.93435 9.64273 2.30942C10.0178 2.68449 10.2285 3.1932 10.2285 3.72363V8.72363ZM8.22852 0.723633C7.43287 0.723633 6.6698 1.0397 6.1072 1.60231C5.54459 2.16492 5.22852 2.92798 5.22852 3.72363V8.72363C5.22852 9.51928 5.54459 10.2823 6.1072 10.845C6.6698 11.4076 7.43287 11.7236 8.22852 11.7236C9.02417 11.7236 9.78723 11.4076 10.3498 10.845C10.9124 10.2823 11.2285 9.51928 11.2285 8.72363V3.72363C11.2285 2.92798 10.9124 2.16492 10.3498 1.60231C9.78723 1.0397 9.02417 0.723633 8.22852 0.723633V0.723633Z"
                fill="black"
              />
            </svg>
          </div>

          <div className="flex flex-col items-center justify-center w-[40px] h-[40px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                d="M13.7263 1.3725L13.8753 1.2235C13.9875 1.11142 14.1206 1.02252 14.2671 0.961889C14.4136 0.901255 14.5706 0.870071 14.7292 0.870117C14.8877 0.870164 15.0447 0.90144 15.1912 0.962159C15.3377 1.02288 15.4707 1.11185 15.5828 1.224C15.6949 1.33615 15.7838 1.46928 15.8444 1.61578C15.9051 1.76229 15.9363 1.9193 15.9362 2.07786C15.9362 2.23641 15.9049 2.39341 15.8442 2.53988C15.7835 2.68634 15.6945 2.81942 15.5823 2.9315L15.4333 3.0795C15.6882 3.36536 15.8241 3.7379 15.8131 4.12073C15.8022 4.50357 15.6452 4.86771 15.3743 5.1385L5.08233 15.4315C5.01799 15.4955 4.93745 15.5408 4.84933 15.5625L0.849332 16.5625C0.765624 16.5833 0.677947 16.5822 0.594824 16.5591C0.511701 16.536 0.43596 16.4919 0.374962 16.4309C0.313965 16.3699 0.269786 16.2941 0.24672 16.211C0.223655 16.1279 0.222488 16.0402 0.243332 15.9565L1.24333 11.9565C1.26521 11.8687 1.31049 11.7886 1.37433 11.7245L11.0163 2.0825C10.9199 2.01463 10.8026 1.98303 10.6851 1.99328C10.5676 2.00352 10.4576 2.05496 10.3743 2.1385L7.08233 5.4315C7.03584 5.47799 6.98065 5.51487 6.91991 5.54003C6.85918 5.56519 6.79407 5.57813 6.72833 5.57813C6.66259 5.57813 6.59749 5.56519 6.53675 5.54003C6.47601 5.51487 6.42082 5.47799 6.37433 5.4315C6.32784 5.38502 6.29097 5.32983 6.26581 5.26909C6.24065 5.20835 6.2277 5.14325 6.2277 5.0775C6.2277 5.01176 6.24065 4.94666 6.26581 4.88592C6.29097 4.82518 6.32784 4.76999 6.37433 4.7235L9.66833 1.4315C9.93931 1.16052 10.3037 1.00352 10.6868 0.992737C11.0699 0.981952 11.4425 1.11819 11.7283 1.3735C12.0031 1.12794 12.3586 0.992114 12.7271 0.99193C13.0956 0.991745 13.4513 1.12722 13.7263 1.3725ZM13.0823 2.1385C12.9886 2.04477 12.8614 1.99211 12.7288 1.99211C12.5962 1.99211 12.4691 2.04477 12.3753 2.1385L2.17833 12.3335L1.41433 15.3905L4.47133 14.6265L14.6683 4.4315C14.7149 4.38506 14.7518 4.32988 14.777 4.26914C14.8022 4.20839 14.8152 4.14327 14.8152 4.0775C14.8152 4.01174 14.8022 3.94661 14.777 3.88587C14.7518 3.82512 14.7149 3.76995 14.6683 3.7235L13.0833 2.1385H13.0823Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-[50px] bg-primary pb-[10px]">
        <div className="flex flex-row items-center">
          <div className="flex flex-row gap-[5px] items-center h-[35px]  border-black px-[16px]">
            <img
              className="w-[20px] h-[20px]"
              src="/images/avatar.png"
              alt=""
            />
            <span className="text-[12px] font-medium">ishikapareek</span>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 4.1394C0 4.0068 0.0526784 3.87962 0.146447 3.78585C0.240215 3.69208 0.367392 3.6394 0.5 3.6394H1C3.202 3.6394 4.827 4.8794 5.874 6.0574C6.364 6.6094 6.739 7.1594 7 7.5894C7.26 7.1594 7.636 6.6094 8.126 6.0574C9.173 4.8794 10.798 3.6394 13 3.6394V4.6394C11.202 4.6394 9.827 5.6494 8.874 6.7214C8.3587 7.30507 7.91613 7.94911 7.556 8.6394C7.91582 9.32965 8.35805 9.97368 8.873 10.5574C9.828 11.6294 11.204 12.6394 13 12.6394V13.6394C10.798 13.6394 9.173 12.3994 8.126 11.2214C7.70551 10.7455 7.32866 10.2328 7 9.6894C6.74 10.1194 6.364 10.6694 5.874 11.2214C4.827 12.3994 3.202 13.6394 1 13.6394H0.5C0.367392 13.6394 0.240215 13.5867 0.146447 13.493C0.0526784 13.3992 0 13.272 0 13.1394C0 13.0068 0.0526784 12.8796 0.146447 12.7859C0.240215 12.6921 0.367392 12.6394 0.5 12.6394H1C2.798 12.6394 4.173 11.6294 5.126 10.5574C5.6413 9.97374 6.08387 9.3297 6.444 8.6394C6.08418 7.94916 5.64195 7.30512 5.127 6.7214C4.172 5.6494 2.796 4.6394 1 4.6394H0.5C0.367392 4.6394 0.240215 4.58673 0.146447 4.49296C0.0526784 4.39919 0 4.27201 0 4.1394Z"
              fill="black"
            />
            <path
              d="M13 6.10537V2.17337C13 2.12586 13.0136 2.07935 13.0391 2.03927C13.0646 1.99919 13.101 1.9672 13.144 1.94706C13.187 1.92691 13.2349 1.91944 13.282 1.92552C13.3291 1.93159 13.3735 1.95097 13.41 1.98137L15.77 3.94737C15.89 4.04737 15.89 4.23137 15.77 4.33137L13.41 6.29737C13.3735 6.32777 13.3291 6.34714 13.282 6.35322C13.2349 6.3593 13.187 6.35183 13.144 6.33168C13.101 6.31153 13.0646 6.27955 13.0391 6.23947C13.0136 6.19939 13 6.15287 13 6.10537ZM13 15.1054V11.1734C13 11.1259 13.0136 11.0793 13.0391 11.0393C13.0646 10.9992 13.101 10.9672 13.144 10.9471C13.187 10.9269 13.2349 10.9194 13.282 10.9255C13.3291 10.9316 13.3735 10.951 13.41 10.9814L15.77 12.9474C15.89 13.0474 15.89 13.2314 15.77 13.3314L13.41 15.2974C13.3735 15.3278 13.3291 15.3471 13.282 15.3532C13.2349 15.3593 13.187 15.3518 13.144 15.3317C13.101 15.3115 13.0646 15.2795 13.0391 15.2395C13.0136 15.1994 13 15.1529 13 15.1054Z"
              fill="black"
            />
          </svg>

          <div className="flex flex-row gap-[8px] items-center h-[35px]  border-black px-[16px]">
            <img
              className="w-[20px] h-[20px] rounded-full"
              src={postToDisplay.avatar}
              alt=""
            />
            <span className="text-[12px] font-medium">
              {postToDisplay.username}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 ml-4 mt-[8px]">
          <img
            className="border border-black rounded-[2px] rounded-4 w-[40px] h-[40px]"
            src={postToDisplay.thumbnail}
          />
          <div>
            <div className="text-[14px] w-[297px]">
              {postToDisplay.title}/{" "}
              <span className="text-[14px] text-secondary font-[700]">
                {postToDisplay.tag}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center mx-[10px] mt-[12px] w-[370px] h-[358px]  border border-[#4F5170] rounded-[8px]">
        {image ? (
          <img
            src={image}
            alt="Generated"
            className="w-full h-full object-cover rounded-[8px]"
          />
        ) : (
          <p className="text-center text-[#4F5170] text-[14px]">
            {isLoading ? "Generating" : " Your creation appears here"}
          </p>
        )}
      </div>

      <div className="flex-none mt-[30px] mx-[10px]">
        <div className="flex flex-row items-center pr-[12px] rounded-[6px] border border-[#4F5170] bg-transparent w-full h-[40px]">
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
                  fillRule="evenodd"
                  clipRule="evenodd"
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
        <button
          className="bg-primary text-black font-[500] h-[45px] w-full rounded-[8px] "
          // onClick={fetchImageFromDalle}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default remix;
