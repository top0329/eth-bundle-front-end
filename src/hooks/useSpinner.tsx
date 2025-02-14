import { useContext } from 'react';
import { SpinnerContext } from '@/contexts/spinnerContext';

const useSpinner = () => {
  const context = useContext(SpinnerContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
};

export default useSpinner;
