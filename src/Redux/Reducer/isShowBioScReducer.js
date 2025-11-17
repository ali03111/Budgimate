import { types } from '../types';

const initial_state = {
  isBioMatricScreen: false,
};
const actionMap = {
  [types.isBioMatricScreenTrue]: (state, act) => ({
    ...state.isBioMatricScreen,
    isBioMatricScreen: true,
  }),
  [types.isBioMatricScreenFalse]: (state, act) => ({
    ...state.isBioMatricScreen,
    isBioMatricScreen: false,
  }),
};
export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
