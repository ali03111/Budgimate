import { useState } from 'react';
import { getExpenseCategoryUrl } from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import { useQuery } from '@tanstack/react-query';

const useExpenseCategory = () => {
  const { data } = useQuery({
    queryKey: ['getExpenseCategoryUrl'],
    queryFn: () => API.get(getExpenseCategoryUrl),
  });

  console.log('llllllllllllllllllll', data?.data);

  const [dateRangeModal, setDateRangeModal] = useState(false);
  return {
    dateRangeModal,
    setDateRangeModal,
    arryList: data?.data?.categories || [],
  };
};

export default useExpenseCategory;
