import { useState } from 'react';

const useCreateNewTraceScreen = () => {
  const [inputWidth, setInputWidth] = useState(20); // starting small
  return { inputWidth, setInputWidth };
};
export default useCreateNewTraceScreen;
