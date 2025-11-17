import { types } from '../types';

export const biomatricTrue = payload => ({
  type: types.isBioMatricTrue,
});
export const biomatricFalse = payload => ({
  type: types.isBioMatricFalse,
});
