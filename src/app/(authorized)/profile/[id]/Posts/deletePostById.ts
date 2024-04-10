export function deletePostById(posts: any, idToDelete: number): any {
  return posts.filter((post: any) => post.id !== idToDelete);
}
