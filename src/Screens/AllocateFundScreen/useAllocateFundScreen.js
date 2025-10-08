import { useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { getLeftOverUrl } from '../../Utils/Urls';

const useAllocateFundScreen = () => {
  const { data } = useQuery({
    queryKey: ['getLeftOverUrl'],
    queryFn: () => API.get(getLeftOverUrl),
  });
  console.log('datadatadatadatadatadatadatadatadatadatadata', data?.data);
  return { leftover: data?.data?.leftover };
};

export default useAllocateFundScreen;
