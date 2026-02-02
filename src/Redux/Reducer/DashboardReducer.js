import { types } from '../types';

const initial_state = {
  totalIncome: null,
  totalExpense: null,
  incomeAvaBudget: null,
  remaningCycleIcome: null,
};

const actionMap = {
  [types.addDashboardData]: (state, act) => {
    return {
      totalIncome: act.payload.totalIncome,
      totalExpense: act.payload.totalExpense,
      incomeAvaBudget: act.payload.incomeAvaBudget,
      remaningCycleIcome: act.payload.remaningCycleIcome,
    };
  },
  [types.removeDashboardData]: () => initial_state,
};

export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
