import { useEffect, useState } from 'react';
import {
  deleteCategoryLimitUrl,
  getExpenseCategoryUrl,
} from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import { useMutation, useQuery } from '@tanstack/react-query';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';

const useExpenseCategory = () => {
  const [dateRange, setDateRange] = useState('current_month');

  const { queryClient } = useReduxStore();

  const { data, refetch } = useQuery({
    queryKey: ['getExpenseCategoryUrl'],
    queryFn: () => API.get(getExpenseCategoryUrl + '?filter=' + dateRange),
  });

  console.log('llllllllllllllllllll', data?.data);

  const { mutate } = useMutation({
    mutationFn: data => {
      return API.post(deleteCategoryLimitUrl + data?.id, {});
    },
    onSuccess: ({ ok, data }) => {
      console.log('skldbvklsdbvklsblkvbsdklbvksd', data);
      if (ok) {
        successMessage(data?.message);
        queryClient.invalidateQueries(['getExpenseCategoryUrl']);
      } else {
        errorMessage('Oops! Something went wrong. Please try again later.');
      }
    },
    onError: () => {
      errorMessage('Network request failed.');
    },
  });

  const [filterData, setFilterData] = useState([]);
  const [text, setText] = useState('');

  // Initialize filterData with traces when data is available
  useEffect(() => {
    if (data?.data?.categories) {
      setFilterData(data.data.categories);
    }
  }, [data]);

  const searchFun = searchText => {
    if (searchText && data?.data?.categories?.length > 0) {
      const newData = data.data.categories.filter(item => {
        const itemData = (item.name || item?.category_name || '').toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
    } else {
      setFilterData(data?.data?.categories ?? []);
    }
    setText(searchText);
  };

  const [dateRangeModal, setDateRangeModal] = useState(false);
  return {
    dateRangeModal,
    setDateRangeModal,
    arryList: data?.data?.categories || [],
    onDeleteCat: id => {
      mutate({ id });
    },
    searchFun,
    filterData,
    text,
    setText,
    dateRange,
    setDateRange,
    refetch,
  };
};

export default useExpenseCategory;
