import { useQuery } from '@tanstack/react-query';
import useReduxStore from '../../Hooks/UseReduxStore';
import API from '../../Utils/helperFunc';
import { getGoalsUrl } from '../../Utils/Urls';

const useMyGoalsScreen = () => {
  const { queryClient } = useReduxStore();

  const { data } = useQuery({
    queryKey: ['getGoalsUrl'],
    queryFn: () => API.get(getGoalsUrl),
  });

  console.log('datadatadatadatadatadatadatadatadatadatadata', data?.data);

  return {};
};

export default useMyGoalsScreen;
