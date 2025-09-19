import { useMutation, useQuery } from '@tanstack/react-query';
import useReduxStore from '../../Hooks/UseReduxStore';
import API from '../../Utils/helperFunc';
import { deleteGoalUrl, getGoalsUrl } from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';

const useAllGoalsScreen = () => {
  const { queryClient } = useReduxStore();

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

  return { goalList: data?.data ?? [], deleteGoal: id => mutate(id) };
};

export default useAllGoalsScreen;
