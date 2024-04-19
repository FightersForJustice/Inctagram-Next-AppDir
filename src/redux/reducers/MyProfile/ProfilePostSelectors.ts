import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';

const selectProfilePostsState = (state: RootState) => state.ProfilePost;

export const selectProfilePostItems = createSelector(
  [selectProfilePostsState],
  (profilePosts) => profilePosts.items
);
