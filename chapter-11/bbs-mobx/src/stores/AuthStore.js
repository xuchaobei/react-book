import { observable, action } from "mobx";

class AuthStore {
  api;
  appStore;
  @observable userId = sessionStorage.getItem("userId");
  @observable username = sessionStorage.getItem("username") || "jack";
  @observable password = "123456";

  constructor(api, appStore) {
    this.api = api;
    this.appStore = appStore;
  }

  @action setUsername(username) {
    this.username = username;
  }

  @action setPassword(password) {
    this.password = password;
  }

  @action login() {
    this.appStore.increaseRequest();
    const params = { username: this.username, password: this.password };
    return this.api.login(params).then(action(data => {
      this.appStore.decreaseRequest();
      if (!data.error) {
        this.userId = data.userId;
        sessionStorage.setItem("userId", this.userId);
        sessionStorage.setItem("username", this.username);
        return Promise.resolve();
      } else {
        this.appStore.setError(data.error);
        return Promise.reject();
      }
    }));
  }

  @action.bound logout() {
    this.userId = undefined;
    this.username = 'jack';
    this.password = '123456';
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
  }
}

export default AuthStore;
