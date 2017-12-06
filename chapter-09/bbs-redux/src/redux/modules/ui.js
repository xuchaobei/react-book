import { types as postTypes } from "./posts";

const initialState = {
  addDialogOpen: false,
  editDialogOpen: false
};

// action types
export const types = {
  OPEN_ADD_DIALOG: "UI/OPEN_ADD_DIALOG",    // 打开新建帖子状态
  CLOSE_ADD_DIALOG: "UI/CLOSE_ADD_DIALOG",  // 关闭新建帖子状态
  OPEN_EDIT_DIALOG: "UI/OPEN_EDIT_DIALOG",  // 打开编辑帖子状态
  CLOSE_EDIT_DIALOG: "UI/CLOSE_EDIT_DIALOG" // 关闭编辑帖子状态
};

// action creators
export const actions = {
  // 打开新建帖子的编辑框
  openAddDialog: () => ({
    type: types.OPEN_ADD_DIALOG
  }),
  // 关闭新建帖子的编辑框
  closeAddDialog: () => ({
    type: types.CLOSE_ADD_DIALOG
  }),
  // 打开编辑帖子的编辑框
  openEditDialog: () => ({
    type: types.OPEN_EDIT_DIALOG
  }),
  // 关闭编辑帖子的编辑框
  closeEditDialog: () => ({
    type: types.CLOSE_EDIT_DIALOG
  })
};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_ADD_DIALOG:
      return { ...state, addDialogOpen: true };
    case types.CLOSE_ADD_DIALOG:
    case postTypes.CREATE_POST:
      return { ...state, addDialogOpen: false };
    case types.OPEN_EDIT_DIALOG:
      return { ...state, editDialogOpen: true };
    case types.CLOSE_EDIT_DIALOG:
    case postTypes.UPDATE_POST:
      return { ...state, editDialogOpen: false };
    default:
      return state;
  }
};

export default reducer;

// selectors
export const isAddDialogOpen = state => {
  return state.ui.addDialogOpen;
};

export const isEditDialogOpen = state => {
  return state.ui.editDialogOpen;
};
