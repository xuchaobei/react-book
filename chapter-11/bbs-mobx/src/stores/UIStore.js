import { observable, action } from "mobx";

class UIStore {
  @observable addDialogOpen = false;
  @observable editDialogOpen = false;

  // 设置新建帖子编辑框的状态
  @action setAddDialogStatus(status) {
    this.addDialogOpen = status
  }
  
  // 设置修改帖子编辑框的状态
  @action setEditDialogStatus(status) {
    this.editDialogOpen = status
  }
}

export default UIStore;