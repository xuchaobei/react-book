const initialState = {
  requestQuantity: 0,  // 当前应用中正在进行的API请求数
  error: null          // 应用全局错误信息
};

// action types
export const types = {
  START_REQUEST: "APP/START_REQUEST",   // 开始发送请求
  FINISH_REQUEST: "APP/FINISH_REQUEST", // 请求结束
  SET_ERROR: "APP/SET_ERROR",           // 设置错误信息
  REMOVE_ERROR: "APP/REMOVE_ERROR"      // 删除错误信息
};

// action creators
export const actions = {
  startRequest: () => ({
    type: types.START_REQUEST
  }),
  finishRequest: () => ({
    type: types.FINISH_REQUEST
  }),
  setError: error => ({
    type: types.SET_ERROR,
    error
  }),
  removeError: () => ({
    type: types.REMOVE_ERROR
  })
};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_REQUEST:
      // 每接收一个API请求开始的action，requestQuantity加1
      return { ...state, requestQuantity: state.requestQuantity + 1 };
    case types.FINISH_REQUEST:
      // 每接收一个API请求结束的action，requestQuantity减1
      return { ...state, requestQuantity: state.requestQuantity - 1 };
    case types.SET_ERROR:
      return { ...state, error: action.error };
    case types.REMOVE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getError = state => {
  return state.app.error;
};

export const getRequestQuantity = state => {
  return state.app.requestQuantity;
};
