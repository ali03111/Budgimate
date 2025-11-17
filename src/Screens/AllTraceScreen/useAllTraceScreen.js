import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import useReduxStore from '../../Hooks/UseReduxStore';
import API from '../../Utils/helperFunc';
import {
  createIncomeUrl,
  deleteTraceUrl,
  getAllTraceUrl,
} from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import { useState, useEffect } from 'react';
import { formatDate } from '../../Services/GlobalFunctions';
import NavigationService from '../../Services/NavigationService';

const useAllTraceScreen = ({ params }, { addListener }) => {
  const { queryClient } = useReduxStore();

  const [modalState, setModalState] = useState(null);
  const [screenName, setScreenName] = useState(false);

  // const { data, refetch } = useQuery({
  //   queryKey: ['getTraceUrl'],
  //   queryFn: () => API.get(getAllTraceUrl),
  //   refetchOnWindowFocus: true,
  // });

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetching,
    isRefetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['getTraceUrl'],
    queryFn: async ({ pageParam = 1 }) => {
      // setTimeout(() => {
      //   dispatch(loadingFalse());
      // }, 100);
      return API.get(`${getAllTraceUrl}?page=${pageParam}`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => (pages?.length ?? 0) + 1,
    cacheTime: 0, // 👈 Don't cache the data
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

  const [formState, setFormState] = useState({
    comment: null,
    inputPrice: null,
  });

  const [inputWidth, setInputWidth] = useState(20); // starting small

  const [datePickerState, setDatePickerState] = useState(null);

  const { comment, inputPrice } = formState;

  const updateState = data => setFormState(prev => ({ ...formState, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

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

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      console.log('sl;dnvl;sdnlvnsdl;vnl;sd', data);
      return API.post(createIncomeUrl, data);
    },
    onSuccess: ({ ok, data }) => {
      console.log('skldbvklbsdklvbklsdbvkbsdkvbsdbvklsdbvksd', data);
      if (ok) {
        successMessage(data?.message);
        setFormState({
          comment: null,
          inputPrice: null,
        });
        queryClient.invalidateQueries([`getTraceUrl`]);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      const getNameFunc = NavigationService.getCurrentRoute();
      const screenName = getNameFunc?.getCurrentRoute()?.name;
      setScreenName(screenName);
    });
    return unsubscribe;
  }, []);

  console.log('datadatadatadatadatadatadatadatadatadatadata', data?.pages);

  const list = data?.pages?.flatMap(page => page.data?.traces) || [];

  return {
    traceList: list.filter(res => res != undefined) ?? [],
    deleteTrace: id => mutate(id),
    searchFun,
    text,
    setText,
    filterData,
    modalState,
    setModalState,
    inputWidth,
    setInputWidth,
    comment,
    inputPrice,
    screenName,
    onChangeVal,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    onAddIncome: data =>
      mutateAsync({
        source: comment ?? '',
        amount: inputPrice,
        start_date: formatDate(new Date()),
        frequency: 'one-time',
        module_type: 'trace',
        module_id: data,
        isIncome: true,
      }),
  };
};

export default useAllTraceScreen;
