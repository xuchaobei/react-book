const topicListFilter = {
  fields: ["id", "title", "author", "vote", "updatedAt"],
  limit: 10,
  order: "updatedAt DESC",
  include: "authorPointer",
  includefilter: { user: { fields: ["id", "username"] } }
};

const topicByIdFilter = id => ({
  fields: ["id", "title", "author", "vote", "updatedAt", "content"],
  where: { id: id },
  include: "authorPointer",
  includefilter: { user: { fields: ["id", "username"] } }
});

const remarkListFilter = topicId => ({
  fields: ["id", "author", "updatedAt", "content"],
  where: { topic: topicId },
  limit: 20,
  order: "updatedAt DESC",
  include: "authorPointer",
  includefilter: { user: { fields: ["id", "username"] } }
});

function encodeFilter(filter) {
  return encodeURIComponent(JSON.stringify(filter));
}

export default {
  login: () => "/user/login",
  getTopicList: () => `/topic?filter=${encodeFilter(topicListFilter)}`,
  getTopicById: id => `/topic?filter=${encodeFilter(topicByIdFilter(id))}`,
  createTopic: () => "/topic",
  updateTopic: id => `/topic/${id}`,
  getRemarkList: topicId =>
    `/remark?filter=${encodeFilter(remarkListFilter(topicId))}`,
  createRemark: () => "/remark"
};
