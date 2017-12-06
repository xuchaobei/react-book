import AppStore from "./AppStore";
import AuthStore from "./AuthStore";
import PostsStore from "./PostsStore";
import CommentsStore from "./CommentsStore";
import UIStore from "./UIStore";
import authApi from "../api/authApi";
import postApi from "../api/postApi";
import commentApi from "../api/commentApi";

const appStore = new AppStore();
const authStore = new AuthStore(authApi, appStore);
const postsStore = new PostsStore(postApi, appStore, authStore);
const commentsStore = new CommentsStore(commentApi, appStore, authStore);
const uiStore = new UIStore();

const stores = {
  appStore,
  authStore,
  postsStore,
  commentsStore,
  uiStore
};

export default stores;