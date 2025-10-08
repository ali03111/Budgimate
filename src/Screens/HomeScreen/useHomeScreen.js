import { useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { getTraceReportUrl, homeDataUrl } from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';
import { useEffect } from 'react';

const useHomeScreen = ({ navigate, addListener }) => {
  const { queryClient } = useReduxStore();

  const { data, refetch } = useQuery({
    queryKey: ['homeDataUrl'],
    queryFn: () => API.get(homeDataUrl),
  });

  useEffect(() => {
    const event = addListener('focus', async () => {
      queryClient.invalidateQueries({ queryKey: ['homeDataUrl'] });
      refetch();
      // if (params?.id) onRefresh();
    });
    return event;
  }, []);

  return {
    totalExpense: data?.data?.total_expense,
    totalIncome: data?.data?.total_income,
    recentExpenses: data?.data?.recent_expenses ?? [],
    expenseData: data?.data?.expense_chart ?? [],
    chartData: data?.data?.income_vs_expense_chart ?? [],
  };
};

export default useHomeScreen;
