import { observable, action } from "mobx";

class UIStore {
  @observable addDialogOpen = false;
  @observable editDialogOpen = false;

  @action setAddDialogStatus(status) {
    this.addDialogOpen = status
  }

  @action setEditDialogStatus(status) {
    this.editDialogOpen = status
  }
}

export default UIStore;