import { useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { getGoalsDetailHistoryUrl } from '../../Utils/Urls';

const useTranscritionHistoryScreen = ({ navigate }, { params }) => {
  const { data } = useQuery({
    queryKey: ['getGoalsDetailHistoryUrl'],
    queryFn: () => API.get(getGoalsDetailHistoryUrl + params?.id),
  });
  console.log('sdklvbklsdbvklsdbklvsbdklvbklsdbvklsdv', data?.data, params?.id);

  return {
    transcitionList: data?.data?.transactions,
    goalDetails: data?.data?.goal,
  };
};

export default useTranscritionHistoryScreen;
