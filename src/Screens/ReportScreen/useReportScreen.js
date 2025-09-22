import { useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { getTraceReportUrl } from '../../Utils/Urls';

const useReportScreen = ({ navigate }, { params }) => {
  const { data } = useQuery({
    queryKey: ['getTraceReportUrl'],
    queryFn: () => API.get(getTraceReportUrl + params?.id),
  });

  console.log('dslkbvklsdblkvbsdlkvbklsdblvksbdklvblsdblkvsd', data?.data);
  return {
    summary: data?.data?.summary,
    categoryArry: data?.data?.categories,
    traceObj: data?.data?.trace,
  };
};

export default useReportScreen;
