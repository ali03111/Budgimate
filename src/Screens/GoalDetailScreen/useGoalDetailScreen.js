import { useState } from 'react';

const useGoalDetailScreen = () => {
  const [modalState, setModalState] = useState(false);
  const [inputWidth, setInputWidth] = useState(20);
  return { modalState, setModalState, inputWidth, setInputWidth };
};

export default useGoalDetailScreen;
