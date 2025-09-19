import { useState } from 'react';
import { logoutThunk } from '../../Redux/Sagas/AuthSaga';
import { types } from '../../Redux/types';
import { useMutation } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { deleteAccUrl } from '../../Utils/Urls';
import { logoutService } from '../../Services/AuthServices';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';
import { store } from '../../Redux/Reducer';

const useSettingScreen = () => {
  const [alertState, setAlertState] = useState({
    logoutAlert: false,
    deleteAlert: false,
  });

  const { mutate } = useMutation({
    mutationFn: () => API.delete(deleteAccUrl),
    onSuccess: async ({ ok, data }) => {
      if (ok) {
        successMessage(data?.message);
        await logoutService();
        store.dispatch(logoutThunk());
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  const { deleteAlert, logoutAlert } = alertState;

  const updateState = data => setAlertState(prev => ({ ...prev, ...data }));

  const toggleAlert = state => updateState({ [state]: !alertState[state] });

  const onConfirm = val => {
    if (val == 'logoutAlert') logoutFunc();
    // else mutate();
  };

  const logoutFunc = () => {
    toggleAlert(
      (logoutAlert && 'logoutAlert') || (deleteAlert && 'deleteAlert'),
    );
    setTimeout(() => {
      store.dispatch(logoutThunk());
    }, 1000);
  };

  return { deleteAlert, logoutAlert, toggleAlert, onConfirm };
};

export default useSettingScreen;
