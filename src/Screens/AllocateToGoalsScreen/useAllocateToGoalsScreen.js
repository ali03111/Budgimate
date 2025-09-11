import { useState } from 'react';

const useAllocateToGoalsScreen = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return {
    modalVisible,
    setModalVisible,
  };
};
export default useAllocateToGoalsScreen;
