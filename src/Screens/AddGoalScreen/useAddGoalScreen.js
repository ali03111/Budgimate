import { useMemo, useState } from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';
import { useMutation } from '@tanstack/react-query';
import { createGoalUrl } from '../../Utils/Urls';
import { formDataFunc } from '../../Utils/helperFunc';
import { successMessage } from '../../Config/NotificationMessage';

const useAddGoalScreen = () => {
  const [inputWidth, setInputWidth] = useState(20); // starting small
  const currentDate = new Date();

  const {
    control,
    register,
    handleSubmit,
    clearErrors,
    reset,
    getFieldState,
    getValues,
    resetField,
    setError,
    setFocus,
    setValue,
    trigger,
    unregister,
    watch,
    errors,
  } = useFormHook(Schemas.logIn);

  const createGoalFun = async ({}) => {
    console.log('Creating event...');
    try {
      const body = {
        'images[]': eventImg,
      };

      console.log('Request Body:', JSON.stringify(body));

      const { ok, data } = await formDataFunc(
        createGoalUrl,
        // isEditEvnet ? updateEventUrl + event?.id : createEventUrl,
        body,
        'images[]',
      );

      console.log('API Response:', data);

      if (ok) {
        // Post-save logic
        if (params?.functionToUpdatePostOrEvent) {
          params?.functionToUpdatePostOrEvent(data);
        }
        if (isEditEvnet) queryClient.invalidateQueries(['profilePosts']);
        queryClient.invalidateQueries({ queryKey: ['getEventDate'] });

        successMessage(
          //   isEditEvnet
          //     ? 'Event updated successfully'
          // :
          'Event created successfully',
        );
        goBack();
      } else {
        errorMessage(
          isEditEvnet ? 'Error on updating event' : 'Error on creating event',
        );
      }
    } catch (error) {
      console.log('Error creating event:', error);
    }
  };

  const [datePicker, setDateRikcer] = useState({
    alertVal: false,
    stateName: null,
    onChange: () => {},
  });

  const toggleDate = stateName =>
    setDateRikcer({
      stateName,
      alertVal: !datePicker.alertVal,
      onChange: e => {
        console.log(stateName, e);
        setValue(stateName, e);
      },
    });
  const onSubmit = () => {};

  return {
    control,
    handleSubmit,
    errors,
    createGoalFun,
    inputWidth,
    setInputWidth,
    currentDate,
    toggleDate,
    datePicker,
  };
};

export default useAddGoalScreen;
