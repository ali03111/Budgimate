import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getModuleCatBasicUrl, postLeftOverUrl } from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import useReduxStore from '../../Hooks/UseReduxStore';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';

const useAllocateToExpenseScreen = ({ goBack }, { params }) => {
  const { data, refetch } = useQuery({
    queryKey: ['expenseByCategoryData'],
    queryFn: () => API.get(getModuleCatBasicUrl),
  });

  const [modalVisible, setModalVisible] = useState(null);
  const [afterAdd, setAfterAdd] = useState(false);

  const { queryClient } = useReduxStore();

  const [formState, setFormState] = useState({
    inputPrice: null,
  });
  const { inputPrice } = formState;

  const [inputWidth, setInputWidth] = useState(20); // starting small

  const updateState = data => setFormState(prev => ({ ...formState, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      console.log(
        'sl;dnvl;sdnlvsdfsdfsdfsdfsdnsdl;vnl;sd',
        {
          amount: inputPrice,
          module_type: 'expense_category',
          module_id: data?.expenseCatId,
          leftover_expense_category_id: params?.expCatId,
        },
        params,
      );
      return API.post(postLeftOverUrl, {
        amount: inputPrice,
        module_type: 'expense_category',
        module_id: data?.expenseCatId,
        leftover_expense_category_id: params?.expCatId,
        module_category_id: params?.expCatId,
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log('hjhjvhjvhjvhjvvhjvhjvhvjvhvsdfsdfsdfsdfsfdjh', data);
      setFormState({
        inputPrice: null,
      });
      setInputWidth(20);
      if (ok) {
        successMessage(data?.message);
        setAfterAdd(true);
        queryClient.invalidateQueries([`getLeftOverUrl`]);
        goBack();
      } else errorMessage(data?.error);
    },
    onError: e => errorMessage(e),
  });

  const [filterData, setFilterData] = useState([]);
  const [text, setText] = useState('');

  // Initialize filterData with traces when data is available
  useEffect(() => {
    if (data?.data) {
      setFilterData(data.data);
    }
  }, [data]);

  const searchFun = searchText => {
    if (searchText && data?.data?.length > 0) {
      const newData = data.data.filter(item => {
        const itemData = (
          item.name ||
          item?.category_name ||
          item?.expense_category?.name ||
          ''
        ).toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
    } else {
      setFilterData(data?.data ?? []);
    }
    setText(searchText);
  };

  const [dateRangeModal, setDateRangeModal] = useState(false);
  const [dateRange, setDateRange] = useState('current_month');
  return {
    onChangeVal,
    inputPrice,
    inputWidth,
    setInputWidth,
    modalVisible,
    setModalVisible,
    addAllocate: expenseCatId => mutateAsync({ expenseCatId }),
    catList: data?.data,
    refetch,
    searchFun,
    dateRangeModal,
    setDateRangeModal,
    text,
    setText,
    dateRange,
    setDateRange,
    filterData,
    afterAdd,
    setAfterAdd,
  };
};

export default useAllocateToExpenseScreen;
