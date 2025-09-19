import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { createTraceUrl } from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';

const useCreateNewTraceScreen = ({ replace, goBack }) => {
  const { queryClient } = useReduxStore();

  const [inputWidth, setInputWidth] = useState(20); // starting small

  const [formState, setFormState] = useState({
    inputPrice: null,
    inputName: null,
  });

  const { inputName, inputPrice } = formState;

  const updateState = data => setFormState(prev => ({ ...formState, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  const [isSelected, setSelectedTrace] = useState('basic');

  const { mutate } = useMutation({
    mutationFn: data => {
      return API.post(createTraceUrl, data);
    },
    onSuccess: ({ ok, data }) => {
      console.log('skldbvklsdbvklsblkvbsdklbvksd', data);
      if (ok) {
        successMessage(data?.message);
        queryClient.invalidateQueries(['getTraceUrl']);
        replace('AddExpenseToTraceScreen', {
          catVal: data?.trace,
          price: inputPrice,
          module_type: 'trace',
          module_id: 3,
          traceType: isSelected,
        });
      } else {
        errorMessage('Oops! Something went wrong. Please try again later.');
      }
    },
    onError: () => {
      errorMessage('Network request failed.');
    },
  });

  return {
    inputWidth,
    setInputWidth,
    isSelected,
    setSelectedTrace,
    onChangeVal,
    inputName,
    inputPrice,
    onCreateTrace: () => {
      if (
        inputPrice != null &&
        inputName != null &&
        inputPrice != '' &&
        inputName != ''
      ) {
        mutate({
          name: inputName,
          type: isSelected,
          budget: inputPrice,
        });
      } else errorMessage('Please complete field');
    },
  };
};
export default useCreateNewTraceScreen;
