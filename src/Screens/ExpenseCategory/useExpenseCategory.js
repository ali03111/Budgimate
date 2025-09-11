import { useState } from 'react';

const useExpenseCategory = () => {
  const [dateRangeModal, setDateRangeModal] = useState(false);
  return { dateRangeModal, setDateRangeModal };
};

export default useExpenseCategory;
