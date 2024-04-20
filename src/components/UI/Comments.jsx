import React, { useState } from "react";
import toast from "react-hot-toast";

const initialComments = [
  {
    id: 1,
    username: "yushiyushi",
    comment: "This is awesome!",
    avatar: "/images/avatar.png",
  },
  {
    id: 2,
    username: "ishikapareek",
    comment: "Really cool post!",
    avatar: "/images/avatar.png",
  },
];

const Comments = () => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (!newComment) return;
    const comment = {
      id: comments.length + 1,
      username: "iyushjain",
      comment: newComment,
      avatar: "/images/avatar.png",
    };
    setComments([comment, ...comments]);
    setNewComment("");
    setTimeout(() => {
      toast(
        (t) => (
          <div className="flex flex-row gap-[10px] items-center">
            <img src="/icons/coin.svg" alt="" /> You earned{" "}
            <span className="font-bold">5</span> coins
          </div>
        ),
        {
          duration: 3000,
        }
      );
    }, 2000);
  };

  return (
    <div className="mx-[10px] mt-[16px] mb-[25px] space-y-4">
      <div className="mb-[16px]">
        <div className="flex flex-row items-center pr-[12px] rounded-[6px] border border-[#4F5170] bg-transparent w-full h-[40px]">
          <input
            type="text"
            placeholder="Comment"
            className="bg-transparent w-full p-[18px] focus:outline-none text-[12px]"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment} className="flex-shrink-0">
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
        </div>
      </div>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div
            key={comment.id}
            className={`flex items-start space-x-2 ${
              index === 0 ? "animate-fade-in" : ""
            }`}
          >
            <img
              src={comment.avatar}
              alt="Avatar"
              className="w-[24px] h-[24px] rounded-full"
            />
            <div>
              <p className="font-medium text-[10px]">{comment.username}</p>
              <p className="text-[12px]">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
