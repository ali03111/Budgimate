import { useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import {
  getTraceReportUrl,
  homeDataUrl,
  incomeVsExpenseUrl,
} from '../../Utils/Urls';
import { useState } from 'react';

const useIncomeVsExpenseScreen = ({ navigate }) => {
  const [dataType, setDateType] = useState({ id: 'monthly', name: 'Monthly' });
  const [activeTab, setActiveTab] = useState('graph');

  const { data, refetch } = useQuery({
    queryKey: ['incomeVsExpenseUrl'],
    queryFn: () => API.get(incomeVsExpenseUrl + dataType?.id),
    cacheTime: 0, // 👈 Don't cache the data
  });

  console.log('dslkbvklsdblkvbsdlkvbklsdblvksbdklvblsdblkvsd', data?.data);
  return {
    totalExpense: data?.data?.total_expense,
    totalIncome: data?.data?.total_income,
    expensesByCategory: data?.data?.expense_by_category ?? [],
    expenseData: data?.data?.expense_chart ?? [],
    chartData: data?.data?.income_vs_expense_chart ?? [],
    setDateType,
    refetch,
    dataType,
    activeTab,
    setActiveTab,
  };
};

export default useIncomeVsExpenseScreen;
