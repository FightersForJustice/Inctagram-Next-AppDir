import { useDeletePostMutation } from "../../../../../../../../api/posts.api";
import { TransparentBtn } from "../../../../../../../../components/TransparentBtn/TransparentBtn";
import React from "react";
import { Loader } from "../../../../../../../../components/Loader/Loader";

export const DeletePost = ({
  postId,
  setOpenDeleteModal,
  setOpen,
}: {
  postId: number;
  setOpenDeleteModal: any;
  setOpen: any;
}) => {
  const [del, { isLoading: isDeleting }] = useDeletePostMutation();
  const deletePost = async () => {
    await del(postId);
    setOpenDeleteModal(false);
    setOpen(false);
  };

  return (
    <>
      <div>
        <p>Are you sure you want to delete this post?</p>
        <div className={"flex justify-between mt-5"}>
          <div className={"w-1/2"}></div>
          <TransparentBtn onClick={deletePost}>Yes</TransparentBtn>
          <TransparentBtn onClick={() => setOpenDeleteModal(false)} style={{ background: "#397cf6", color: "white" }}>
            No
          </TransparentBtn>
        </div>
      </div>
      {isDeleting && <Loader />}
    </>
  );
};
