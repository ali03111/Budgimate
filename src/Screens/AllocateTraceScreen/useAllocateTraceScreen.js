import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import API from '../../Utils/helperFunc';
import { getAllTraceUrl, postLeftOverUrl } from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';

const useAllocateTraceScreen = ({ navigate }, { params }) => {
  const isProTrace = params?.isPro || false;

  const { data } = useQuery({
    queryKey: ['getTraceUrl'],
    queryFn: () => API.get(getAllTraceUrl),
    refetchOnWindowFocus: true,
  });

  const { queryClient } = useReduxStore();

  const [formState, setFormState] = useState({
    inputPrice: null,
  });

  const [inputWidth, setInputWidth] = useState(20); // starting small

  const { inputPrice } = formState;

  const updateState = data => setFormState(prev => ({ ...formState, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      console.log('sl;dnvl;sdnlvnsdl;vnl;sd', data);
      return API.post(postLeftOverUrl, {
        amount: inputPrice,
        module_type: 'trace',
        module_id: data?.traceId,
      });
    },
    onSuccess: ({ ok, data }) => {
      setFormState({
        inputPrice: null,
      });
      setInputWidth(20);
      if (ok) {
        successMessage(data?.message);
        queryClient.invalidateQueries([`getLeftOverUrl`]);
        goBack();
      } else errorMessage(data?.error);
    },
    onError: e => errorMessage(e),
  });

  const [modalVisible, setModalVisible] = useState(null);
  return {
    modalVisible,
    setModalVisible,
    isProTrace,
    traceList: data?.data?.traces,
    onChangeVal,
    inputPrice,
    inputWidth,
    setInputWidth,
    addAllocate: traceId => mutateAsync({ traceId }),
  };
};
export default useAllocateTraceScreen;
