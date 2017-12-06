// 获取帖子列表的过滤条件
const postListFilter = {
  fields: ["id", "title", "author", "vote", "updatedAt"],
  limit: 10,
  order: "updatedAt DESC",
  include: "authorPointer",
  includefilter: { user: { fields: ["id", "username"] } }
};

// 获取帖子详情的过滤条件
const postByIdFilter = id => ({
  fields: ["id", "title", "author", "vote", "updatedAt", "content"],
  where: { id: id },
  include: "authorPointer",
  includefilter: { user: { fields: ["id", "username"] } }
});

// 获取评论列表的过滤条件
const commentListFilter = postId => ({
  fields: ["id", "author", "updatedAt", "content"],
  where: { post: postId },
  limit: 20,
  order: "updatedAt DESC",
  include: "authorPointer",
  includefilter: { user: { fields: ["id", "username"] } }
});

function encodeFilter(filter) {
  return encodeURIComponent(JSON.stringify(filter));
}

export default {
  // 登录
  login: () => "/user/login",
  // 获取帖子列表
  getPostList: () => `/post?filter=${encodeFilter(postListFilter)}`,
  // 获取帖子详情
  getPostById: id => `/post?filter=${encodeFilter(postByIdFilter(id))}`,
  // 新建帖子
  createPost: () => "/post",
  // 修改帖子
  updatePost: id => `/post/${id}`,
  // 获取评论列表
  getCommentList: postId =>
    `/comment?filter=${encodeFilter(commentListFilter(postId))}`,
  // 新建评论  
  createComment: () => "/comment"
};
