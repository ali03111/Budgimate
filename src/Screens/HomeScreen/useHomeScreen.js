import { useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import {
  homeDataUrl,
  homeSpendingOverUrl,
  newHomeWithTimeUrl,
} from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { types } from '../../Redux/types';

const useHomeScreen = ({ navigate, addListener }) => {
  const { queryClient, dispatch } = useReduxStore();

  const { data, refetch } = useQuery({
    queryKey: ['homeDataUrl'],
    // queryFn: () => API.get(homeDataUrl),
    queryFn: () => API.get(newHomeWithTimeUrl + new Date().toISOString()),
  });
  const homeSpendingOverFun = useQuery({
    queryKey: ['homeSpendingOverUrl'],
    queryFn: () => API.get(homeSpendingOverUrl),
  });

  useEffect(() => {
    const event = addListener('focus', async () => {
      queryClient.invalidateQueries({ queryKey: ['homeDataUrl'] });
      refetch();
      homeSpendingOverFun.refetch();
      // if (params?.id) onRefresh();
    });
    return event;
  }, []);

  useEffect(() => {
    dispatch({
      type: types.addDashboardData,
      payload: {
        totalIncome: data?.data?.total_income,
        totalExpense: data?.data?.total_expense,
        incomeAvaBudget:
          homeSpendingOverFun?.data?.data?.income_available_to_budget,
        remaningCycleIcome:
          homeSpendingOverFun?.data?.data?.total_remaining_income,
      },
    });
    if (data?.data?.cycle_type == 'previous') {
      if (data?.data?.total_income == data?.data?.total_expense) {
        Alert.alert(
          'Good job',
          'Good job, you stayed on budget last cycle. Keep up the great work!',
          [{ text: 'OK', onPress: () => refetch() }],
        );
      } else if (data?.data?.total_income < data?.data?.total_expense) {
        Alert.alert(
          'Overspent Alert',
          'You unfortunately had a negative Total Remaining Income for last cycle. But don’t worry, there’s always time to improve. You got this!',
          [{ text: 'OK', onPress: () => refetch() }],
        );
      } else if (data?.data?.total_income > data?.data?.total_expense) {
        Alert.alert(
          'Good job',
          'You stayed on budget last cycle. Keep up the great work!',
          [{ text: 'OK', onPress: () => refetch() }],
        );
      }
    }
  }, [data?.data?.cycle_type]);

  console.log('homedatahomedatahomedatahomedata', data?.data);

  return {
    totalExpense: data?.data?.total_expense,
    totalIncome: data?.data?.total_income,
    recentExpenses: data?.data?.recent_expenses ?? [],
    expenseData: data?.data?.expense_chart,
    chartData: data?.data?.income_vs_expense_chart ?? [],
    spendungOverData: homeSpendingOverFun.data?.data,
    leftOver: data?.data?.total_leftover,
  };
};

export default useHomeScreen;
