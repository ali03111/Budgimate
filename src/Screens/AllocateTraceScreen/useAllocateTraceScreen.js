import { useState } from 'react';

const useAllocateTraceScreen = ({ navigate }, { params }) => {
  const isProTrace = params?.isPro || false;

  const [modalVisible, setModalVisible] = useState(false);
  return {
    modalVisible,
    setModalVisible,
    isProTrace,
  };
};
export default useAllocateTraceScreen;
