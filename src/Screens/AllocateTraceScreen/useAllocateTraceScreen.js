import { useState } from 'react';

const useAllocateTraceScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return {
    modalVisible,
    setModalVisible,
  };
};
export default useAllocateTraceScreen;
