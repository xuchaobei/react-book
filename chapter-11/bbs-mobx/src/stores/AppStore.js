import { observable, computed, action } from "mobx";

class AppStore {
  @observable requestQuantity = 0;
  @observable error = null;
  
  @computed get isLoading() {
    return this.requestQuantity > 0;
  }
  
  // 当前进行的请求数量加1
  @action increaseRequest() {
    this.requestQuantity ++;
  }

  // 当前进行的请求数量减1
  @action decreaseRequest() {
    if(this.requestQuantity > 0)
      this.requestQuantity --;
  }

  // 设置错误信息
  @action setError(error) {
    this.error = error;
  }

  // 删除错误信息
  @action.bound removeError() {
    this.error = null;
  }
}

export default AppStore;