import { observable, computed, action } from "mobx";

class AppStore {
  @observable requestQuantity = 0;
  @observable error = null;
  
  @computed get isLoading() {
    return this.requestQuantity > 0;
  }
  
  @action increaseRequest() {
    this.requestQuantity ++;
  }

  @action decreaseRequest() {
    if(this.requestQuantity > 0)
      this.requestQuantity --;
  }

  @action setError(error) {
    this.error = error;
  }

  @action.bound removeError() {
    this.error = null;
  }
}

export default AppStore;