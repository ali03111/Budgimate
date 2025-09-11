import { useState } from 'react';

const useAddExpenseToTraceScreen = () => {
  const [modalState, setModalState] = useState(null);
  const [catName, setCatName] = useState(null);
  const [expenceAmount, setExpenceAmount] = useState(null);

  const [categoryArry, setCategoryArry] = useState([]);

  return {
    modalState,
    setModalState,
    expenceAmount,
    setExpenceAmount,
    catName,
    setCatName,
    categoryArry,
    setCategoryArry,
  };
};

export default useAddExpenseToTraceScreen;
