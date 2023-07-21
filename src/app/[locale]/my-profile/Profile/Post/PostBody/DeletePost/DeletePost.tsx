import { useDeletePostMutation } from "../../../../../../../api/posts.api";
import { TransparentBtn } from "../../../../../../../components/TransparentBtn/TransparentBtn";
import React from "react";

export const DeletePost = ({ postId, setOpeDeleteModal }: { postId: number; setOpeDeleteModal: any }) => {
  const [del] = useDeletePostMutation();
  const deletePost = () => {
    del(postId);
  };

  return (
    <div>
      <p>Are you sure you want to delete this post?</p>
      <div className={"flex justify-between mt-5"}>
        <div className={"w-1/2"}></div>
        <TransparentBtn onClick={deletePost}>Yes</TransparentBtn>
        <TransparentBtn onClick={() => setOpeDeleteModal(false)} style={{ background: "#397cf6", color: "white" }}>
          No
        </TransparentBtn>
      </div>
    </div>
  );
};
