import { useMutation, useQuery } from '@tanstack/react-query';
import useReduxStore from '../../Hooks/UseReduxStore';
import API from '../../Utils/helperFunc';
import { deleteTraceUrl, getAllTraceUrl } from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import { useState, useEffect } from 'react';

const useAllTraceScreen = () => {
  const { queryClient } = useReduxStore();

  const { data } = useQuery({
    queryKey: ['getTraceUrl'],
    queryFn: () => API.get(getAllTraceUrl),
    refetchOnWindowFocus: true,
  });

  const { mutate } = useMutation({
    mutationFn: data => {
      return API.post(deleteTraceUrl + data, {});
    },
    onSuccess: ({ ok, data }) => {
      console.log('skldbvklsdbvklsblkvbsdklbvksd', data);
      if (ok) {
        successMessage(data?.message);
        queryClient.invalidateQueries(['getTraceUrl']);
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
    if (data?.data?.traces) {
      setFilterData(data.data.traces);
    }
  }, [data]);

  const searchFun = searchText => {
    if (searchText && data?.data?.traces?.length > 0) {
      const newData = data.data.traces.filter(item => {
        const itemData = (item.name || item?.category_name || '').toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
    } else {
      setFilterData(data?.data?.traces ?? []);
    }
    setText(searchText);
  };

  console.log('datadatadatadatadatadatadatadatadatadatadata', data?.data);

  return {
    traceList: data?.data?.traces,
    deleteTrace: id => mutate(id),
    searchFun,
    text,
    setText,
    filterData,
  };
};

export default useAllTraceScreen;
