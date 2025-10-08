import { useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { getTraceReportUrl } from '../../Utils/Urls';
import { useState } from 'react';

const useReportScreen = ({ navigate }, { params }) => {
  const { data, refetch } = useQuery({
    queryKey: ['getTraceReportUrl'],
    queryFn: () => API.get(getTraceReportUrl + params?.id),
  });

  const [dateSelector, setDateSelector] = useState({
    startDate: null,
    endDate: null,
  });
  const { endDate, startDate } = dateSelector;

  const updateState = data => setDateSelector(prev => ({ ...prev, ...data }));

  const onChangeVal = (key, val) => {
    updateState({ [key]: val });
  };

  const [datePickerState, setDatePickerState] = useState(null);

  console.log('dslkbvklsdblkvbsdlkvbklsdblvksbdklvblsdblkvsd', data?.data);
  return {
    summary: data?.data?.summary,
    categoryArry: data?.data?.categories ?? [],
    traceObj: data?.data?.trace,
    datePickerState,
    setDatePickerState,
    onChangeVal,
    startDate,
    endDate,
    dateSelector,
    dateSelector,
    refetch,
  };
};

export default useReportScreen;
