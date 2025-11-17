import { types } from '../types';

const initial_state = {
  isBioMatric: false,
};
const actionMap = {
  [types.isBioMatricTrue]: (state, act) => ({
    ...state.isBioMatric,
    isBioMatric: true,
  }),
  [types.isBioMatricFalse]: (state, act) => ({
    ...state.isBioMatric,
    isBioMatric: false,
  }),
};
export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
