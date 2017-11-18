import { post } from "../utils/request";
import url from "../utils/url";

export default {
  login: data => post(url.login(), data)
};
