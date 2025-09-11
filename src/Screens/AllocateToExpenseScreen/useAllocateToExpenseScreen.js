import { useState } from 'react';

const useAllocateToExpenseScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return {
    modalVisible,
    setModalVisible,
  };
};

export default useAllocateToExpenseScreen;
