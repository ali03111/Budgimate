import { types } from '../types';

export const bioVerifyTrue = payload => ({
  type: types.isBioMatricScreenTrue,
});
export const bioVerifyFalse = payload => ({
  type: types.isBioMatricScreenFalse,
});
