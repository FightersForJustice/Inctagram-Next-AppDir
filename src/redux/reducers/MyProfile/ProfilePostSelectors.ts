import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { Item } from './ProfilePostReducer';

const selectProfilePostsState = (state: RootState) => state.ProfilePost;

export const selectProfilePostItems = createSelector(
  [selectProfilePostsState],
  (profilePosts) => profilePosts.items
);

export const selectProfilePostById = (postId: number) =>
  createSelector([selectProfilePostItems], (items) =>
    items.find((item: Item) => item.id === postId)
  );

export const selectProfilePostOwner = (postId: number) =>
  createSelector([selectProfilePostById(postId)], (post) =>
    post ? post.owner : null
  );
