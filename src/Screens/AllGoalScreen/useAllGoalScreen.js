import { useMutation, useQuery } from '@tanstack/react-query';
import useReduxStore from '../../Hooks/UseReduxStore';
import API from '../../Utils/helperFunc';
import { deleteGoalUrl, getGoalsUrl } from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import { useEffect, useState } from 'react';
import NavigationService from '../../Services/NavigationService';

const useAllGoalsScreen = ({ addListener }) => {
  const { queryClient } = useReduxStore();

  const [screenName, setScreenName] = useState(false);

  const { data } = useQuery({
    queryKey: ['getGoalsUrl'],
    queryFn: () => API.get(getGoalsUrl),
  });

  const { mutate } = useMutation({
    mutationFn: data => {
      return API.delete(deleteGoalUrl + data, {});
    },
    onSuccess: ({ ok, data }) => {
      console.log('skldbvklsdbvklsblkvbsdklbvksd', data);
      if (ok) {
        successMessage(data?.message);
        queryClient.invalidateQueries(['getGoalsUrl']);
      } else {
        errorMessage('Oops! Something went wrong. Please try again later.');
      }
    },
    onError: () => {
      errorMessage('Network request failed.');
    },
  });

  console.log('datadatadatadatadatadatadatadatadatadatadata', data?.data);

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      const getNameFunc = NavigationService.getCurrentRoute();
      const screenName = getNameFunc?.getCurrentRoute()?.name;
      setScreenName(screenName);
    });
    return unsubscribe;
  }, []);

  return {
    goalList: data?.data ?? [],
    deleteGoal: id => mutate(id),
    screenName,
  };
};

export default useAllGoalsScreen;
